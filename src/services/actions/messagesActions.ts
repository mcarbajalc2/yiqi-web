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
} from "@/schemas/messagesSchema";

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
