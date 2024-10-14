"use server";

import prisma from "@/lib/prisma";
import {
  sendUserWhatsappMessage,
  sendUserWhatsappMessageProps,
} from "@/lib/whatsapp";
import { getUser, isEventAdmin, isOrganizerAdmin } from "@/lib/auth/lucia";

export async function getUserMessageThreads(
  userId: string,
  eventId?: string | undefined,
  orgId?: string | undefined,
) {
  const currentUser = await getUser();
  if (!currentUser) throw new Error("Unauthorized");

  let isAllowed = false;
  if (eventId) {
    isAllowed = await isEventAdmin(eventId, currentUser.id);
  } else if (orgId) {
    isAllowed = await isOrganizerAdmin(orgId, currentUser.id);
  }
  if (!isAllowed) {
    throw new Error("Unauthorized: no access to event or organization");
  }

  const messageThreads = await prisma.messageThread.findMany({
    where: {
      contextUserId: userId,
      ...(eventId ? { eventId } : {}),
    },
    include: {
      messages: {
        take: 100,
      },
    },
  });

  return messageThreads;
}

export async function sendUserWhatsappMessageAction(
  props: sendUserWhatsappMessageProps & { eventId?: string | undefined },
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
