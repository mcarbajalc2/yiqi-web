'use server'

import { SavedEventType } from '@/schemas/eventSchema'
import prisma from '@/lib/prisma'
import { SavedEventSchema } from '@/schemas/eventSchema'

export async function getEvent(eventId: string): Promise<SavedEventType> {
  const event = await prisma.event.findUniqueOrThrow({
    where: { id: eventId }
  })

  return SavedEventSchema.parse(event)
}
