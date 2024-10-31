import { getOrganization } from '@/services/actions/organizationActions'
import { getEvent } from '@/services/actions/eventActions'
import { getUser, isOrganizerAdmin } from '@/lib/auth/lucia'
import { DbEventSchema } from '@/schemas/eventSchema'

export async function getEventData(organizationId: string, eventId: string) {
  const [organization, event, currentUser] = await Promise.all([
    getOrganization(organizationId),
    getEvent(eventId),
    getUser()
  ])

  if (!event) {
    return { notFound: true }
  }

  const isAdmin =
    currentUser && (await isOrganizerAdmin(organizationId, currentUser.id))

  return { organization, event: DbEventSchema.parse(event), isAdmin }
}
