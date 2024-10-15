"use server";

import prisma from "@/lib/prisma";
import {
  sendUserWhatsappMessage,
  sendUserWhatsappMessageProps,
} from "@/lib/whatsapp";
import { getUser, isEventAdmin, isOrganizerAdmin } from "@/lib/auth/lucia";
import { OrgMessageListItemSchema } from "@/schemas/messagesSchema";

export async function getUserMessageThreads(userId: string, orgId: string) {
  const currentUser = await getUser();
  if (!currentUser) throw new Error("Unauthorized");

  const isAllowed = await isOrganizerAdmin(orgId, currentUser.id);
  if (!isAllowed) {
    throw new Error("Unauthorized: no access to event or organization");
  }

  const messageThreads = await prisma.messageThread.findMany({
    where: {
      contextUserId: userId,
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      messages: {
        take: 30,
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return messageThreads;
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
