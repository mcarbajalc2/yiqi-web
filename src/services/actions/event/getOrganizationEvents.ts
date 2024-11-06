'use server'

import prisma from '@/lib/prisma'
import { EventInputSchema } from '@/schemas/eventSchema'
import { z } from 'zod'

export const organizationEventSchema = EventInputSchema.extend({
  id: z.string()
})

type OrganizationEventSchemaType = z.infer<typeof organizationEventSchema>

export async function getOrganizationEvents(
  organizationId: string
): Promise<OrganizationEventSchemaType[]> {
  const events = await prisma.event.findMany({
    where: { organizationId },

    orderBy: { startDate: 'asc' }
  })

  return events.map(event => organizationEventSchema.parse(event))
}
