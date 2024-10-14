// pages/api/checkUnpaidUsers.ts

import prisma from "@/lib/prisma";
import sendPaymentReminder from "@/services/notifications/sendPaymentReminder";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Find notifications that need to be sent
  const notificationsToSend = await prisma.notification.findMany({
    where: {
      scheduledFor: {
        lte: new Date(),
      },
      sentAt: null,
      eventId: {
        not: null,
      },
      user: {
        stopCommunication: false,
      },
    },
    include: {
      user: true,
      event: true,
      organization: true,
      form: true, // Add this line
    },
    take: 20,
  });

  // Send the reminders
  for (const notification of notificationsToSend) {
    if (notification.event) {
      if (notification.type === "RESERVATION_PAYMENT_REMINDER") {
        if (!notification.user) {
          throw "user is missing";
        }
        await sendPaymentReminder(
          notification.user,
          notification.event,
          notification.organization
        );
      }
      // else if (notification.type === "FORM_SUBMISSION" && notification.form) {
      //   if (!notification.user) {
      //     throw "user is missing";
      //   }
      //   await sendFormSubmissionNotification(
      //     notification.user,
      //     notification.event,
      //     notification.organization,
      //     notification.form
      //   );
      // }
    }

    // Mark the notification as sent
    await prisma.notification.update({
      where: { id: notification.id },
      data: { sentAt: new Date() },
    });
  }

  res.status(200).json({ message: "Notifications sent" });
}
