import prisma from '@/lib/prisma'
import { userSchema } from '@/schemas/userSchema'
import { z } from 'zod'
import { AttendeeStatus } from '@prisma/client'

export const eventRegistrationsSchema = z.object({
  id: z.string(),
  user: userSchema,
  status: z.nativeEnum(AttendeeStatus),
  createdAt: z.date(),
  updatedAt: z.date(),
  paid: z.boolean(),
  paymentId: z.string().optional()
})

export type EventRegistrationsSchemaType = z.infer<
  typeof eventRegistrationsSchema
>

export async function getEventRegistrations(eventId: string) {
  const attendees = await prisma.eventRegistration.findMany({
    where: { eventId },
    include: { user: true, tickets: true }
  })

  return attendees.map(attendee => eventRegistrationsSchema.parse(attendee))
}
