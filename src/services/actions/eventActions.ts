'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import {
  EventInputSchema,
  createAttendeeSchema,
  DbEventSchema,
  EventRegistrationSchema
} from '@/schemas/eventSchema'
import { z } from 'zod'
import setupInitialEventNotifications from '../notifications/setupInitialNotifications'
import { getUser, isOrganizerAdmin } from '@/lib/auth/lucia'
import { AttendeeStatus } from '@prisma/client'
type DbEvent = z.infer<typeof DbEventSchema>

export async function getOrganizationEvents(
  organizationId: string
): Promise<DbEvent[]> {
  const events = await prisma.event.findMany({
    where: { organizationId },
    orderBy: { startDate: 'asc' }
  })

  return events.map(event => DbEventSchema.parse(event))
}

export async function getEvent(eventId: string): Promise<DbEvent> {
  const event = await prisma.event.findUniqueOrThrow({
    where: { id: eventId }
  })

  return DbEventSchema.parse(event)
}

export async function createEvent(orgId: string, eventData: unknown) {
  const currentUser = await getUser()
  if (!currentUser || !(await isOrganizerAdmin(orgId, currentUser.id))) {
    throw new Error('Unauthorized')
  }

  const validatedData = EventInputSchema.parse(eventData)

  const event = await prisma.event.create({
    data: {
      ...validatedData,
      organizationId: orgId
    }
  })

  const tickets = await prisma.ticketOfferings.createMany({
    data: validatedData.tickets.map(ticket => ({
      ...ticket,
      eventId: event.id
    }))
  })

  revalidatePath(`/admin/organizations/${orgId}/events`)
  return DbEventSchema.parse({ ...event, tickets })
}

export async function updateEvent(eventId: string, eventData: unknown) {
  const event = await getEvent(eventId)
  if (!event) throw new Error('Event not found')

  const currentUser = await getUser()
  if (
    !currentUser ||
    !(await isOrganizerAdmin(event.organizationId, currentUser.id))
  ) {
    throw new Error('Unauthorized')
  }

  const validatedData = EventInputSchema.parse(eventData)

  // Delete existing tickets and create new ones
  await prisma.ticketOfferings.deleteMany({
    where: { eventId }
  })

  const updatedEvent = await prisma.event.update({
    where: { id: eventId },
    data: {
      ...validatedData,
      organizationId: event.organizationId
    }
  })

  const tickets = await prisma.ticketOfferings.createMany({
    data: validatedData.tickets.map(ticket => ({
      ...ticket,
      eventId: eventId
    }))
  })

  revalidatePath(`/admin/organizations/${event.organizationId}/events`)
  return DbEventSchema.parse({ ...updatedEvent, tickets })
}

export async function deleteEvent(eventId: string) {
  const event = await getEvent(eventId)
  if (!event) throw new Error('Event not found')

  const currentUser = await getUser()
  if (
    !currentUser ||
    !(await isOrganizerAdmin(event.organizationId, currentUser.id))
  ) {
    throw new Error('Unauthorized')
  }

  await prisma.event.delete({ where: { id: eventId } })

  revalidatePath(`/admin/organizations/${event.organizationId}/events`)
}

export async function createRegistration(
  eventId: string,
  attendeeData: Record<string, unknown>
) {
  const event = await getEvent(eventId)
  if (!event) throw new Error('Event not found')

  const attendeeSchema = createAttendeeSchema(event.customFields)
  const validatedData = attendeeSchema.parse(attendeeData)

  const signedInUser = await getUser()

  let user = signedInUser
    ? signedInUser
    : await prisma.user.findUnique({
        where: { email: validatedData.email }
      })

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: validatedData.email,
        name: validatedData.name || validatedData.email.split('@')[0]
      }
    })
  }

  const registration = await prisma.eventRegistration.create({
    data: {
      userId: user.id,
      eventId: event.id,
      status: event.requiresApproval ? 'PENDING' : 'APPROVED',
      customFields: validatedData
    }
  })

  if (registration.status === AttendeeStatus.APPROVED) {
    // maybe support multiple tickets per registration in the future
    // await prisma.ticket.create({
    //   data: {
    //     registrationId: registration.id,
    //     userId: user.id
    //   }
    // })
  }

  await setupInitialEventNotifications({
    userId: user.id,
    eventId: event.id,
    eventStartDate: new Date(event.startDate),
    orgId: event.organizationId
  })

  return registration
}

export async function getPublicEvents(): Promise<DbEvent[]> {
  const now = new Date()
  const events = await prisma.event.findMany({
    where: {
      endDate: { gte: now }
    },
    orderBy: { startDate: 'asc' }
  })

  return events.map(event => DbEventSchema.parse(event))
}

export async function getUserRegistrationStatus(
  eventId: string,
  userId: string
) {
  const attendee = await prisma.eventRegistration.findUnique({
    where: {
      eventId_userId: {
        eventId,
        userId
      }
    }
  })
  return attendee ? true : false
}

export async function getEventDetails(eventId: string) {
  const event = await getEvent(eventId)

  return DbEventSchema.parse(event)
}

export async function getEventRegistrations(eventId: string) {
  const registrations = await prisma.eventRegistration.findMany({
    where: { eventId },
    include: {
      user: true
    }
  })

  return registrations.map(registration =>
    EventRegistrationSchema.parse(registration)
  )
}

export async function getEventRegistrationsByUserId(userId: string) {
  const registrations = await prisma.eventRegistration.findMany({
    where: { userId },
    include: {
      event: true,
      user: true
    }
  })

  return registrations.map(registration =>
    EventRegistrationSchema.parse(registration)
  )
}

export async function checkInUserToEvent(eventId: string, ticketId: string) {
  const event = await getEvent(eventId)
  if (!event) throw new Error('Event not found')

  const currentUser = await getUser()
  if (
    !currentUser ||
    !(await isOrganizerAdmin(event.organizationId, currentUser.id))
  ) {
    throw new Error('Unauthorized')
  }

  const updatedRegistration = await prisma.ticket.update({
    where: { id: ticketId },
    data: {
      checkedInByUserId: currentUser.id,
      checkedInDate: new Date()
    },
    include: {
      user: true
    }
  })

  return EventRegistrationSchema.parse(updatedRegistration)
}
