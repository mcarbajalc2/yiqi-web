import prisma from '@/lib/prisma'
import { PublicEventSchema } from '@/schemas/eventSchema'

export async function getPublicEvents() {
  const now = new Date()
  const events = await prisma.event.findMany({
    where: {
      endDate: { gte: now }
    },
    include: {
      organization: {
        select: {
          logo: true,
          name: true
        }
      },
      registrations: {
        select: {
          id: true
        }
      }
    },
    orderBy: { startDate: 'asc' }
  })

  return events.map(event =>
    PublicEventSchema.parse({
      ...event,
      registrations: event.registrations.length
    })
  )
}
