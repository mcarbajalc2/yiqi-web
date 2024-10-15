"use server";

import prisma from "@/lib/prisma";
import {
  sendUserWhatsappMessage,
  sendUserWhatsappMessageProps,
} from "@/lib/whatsapp";
import { getUser, isEventAdmin, isOrganizerAdmin } from "@/lib/auth/lucia";
import {
  OrgMessageListItemSchema,
  MessageListSchema,
  MessageThreadType,
  MessageThreadTypeEnum,
  MessageSchema,
} from "@/schemas/messagesSchema";
import { sendEmailToUser } from "@/lib/email/handlers/sendMessageToUser";
import { MailTemplatesIds } from "@/lib/email/lib";

export async function getUserMessageList(userId: string, orgId: string) {
  const currentUser = await getUser();
  if (!currentUser) throw new Error("Unauthorized");

  const isAllowed = await isOrganizerAdmin(orgId, currentUser.id);
  if (!isAllowed) {
    throw new Error("Unauthorized: no access to event or organization");
  }

  const messageList = await prisma.message.findMany({
    where: {
      OR: [
        {
          senderUserId: userId,
        },
        {
          destinationUserId: userId,
        },
      ],
    },
    take: 40,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      senderUser: {
        select: { id: true, name: true, picture: true },
      },
      destinationUser: {
        select: { id: true, name: true, picture: true },
      },
      messageThread: {
        select: {
          type: true,
          id: true,
        },
      },
    },
  });

  return MessageListSchema.parse(messageList);
}

export async function sendUserWhatsappMessageAction(
  props: sendUserWhatsappMessageProps & { eventId?: string | undefined }
) {
  const currentUser = await getUser();
  if (!currentUser) throw new Error("Unauthorized");

  if (props.eventId) {
    const isAllowed = await isEventAdmin(props.eventId, currentUser.id);

    if (!isAllowed) {
      throw new Error("Unauthorized: not allowed to see messages");
    }
  }

  return sendUserWhatsappMessage({ ...props, senderUserId: currentUser.id });
}

export async function getOrganizationMessageThreads(orgId: string) {
  const currentUser = await getUser();
  if (!currentUser) throw new Error("Unauthorized");

  const isAllowed = await isOrganizerAdmin(orgId, currentUser.id);

  if (!isAllowed) {
    throw new Error("Unauthorized: no access to event or organization");
  }

  const messageThreads = await prisma.messageThread.findMany({
    where: {
      organizationId: orgId,
    },
    orderBy: {
      updatedAt: "desc",
    },
    take: 100,
    distinct: ["contextUserId"],
    include: {
      contextUser: true,
      messages: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
  });

  return messageThreads.map((thread) => OrgMessageListItemSchema.parse(thread));
}

export async function sendUserCommunication(props: {
  destinationUserId: string;
  content: string;
  messageType: MessageThreadType;
  orgId: string;
}) {
  const currentUser = await getUser();
  if (!currentUser) throw new Error("Unauthorized");

  const isAllowed = await isOrganizerAdmin(props.orgId, currentUser.id);
  if (!isAllowed) {
    throw new Error("Unauthorized: no access to event or organization");
  }

  const thread = await prisma.messageThread.findFirst({
    where: {
      contextUserId: currentUser.id,
      type: props.messageType,
      organizationId: props.orgId,
    },
  });

  if (!thread) {
    throw new Error("Thread not found");
  }

  if (thread.type === MessageThreadTypeEnum.Enum.whatsapp) {
    const result = await sendUserWhatsappMessage({
      destinationUserId: props.destinationUserId,
      content: props.content,
      threadId: thread.id,
    });
    return MessageSchema.parse(result);
  } else if (thread.type === MessageThreadTypeEnum.Enum.email) {
    const result = await sendEmailToUser({
      templateId: MailTemplatesIds.BASE_EMAIL_TEMPLATE,
      dynamicTemplateData: {
        content: props.content,
      },
      destinationUserId: props.destinationUserId,
      threadId: thread.id,
      subject: "Mensaje de la plataforma",
    });
    return MessageSchema.parse(result);
  }

  throw new Error("Invalid message type");
}
