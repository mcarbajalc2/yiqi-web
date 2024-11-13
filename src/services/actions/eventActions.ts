'use server'

import prisma from '@/lib/prisma'

import {
  createAttendeeSchema,
  EventRegistrationSchema
} from '@/schemas/eventSchema'
import setupInitialEventNotifications from '../notifications/setupInitialNotifications'
import { getUser, isOrganizerAdmin } from '@/lib/auth/lucia'
import { AttendeeStatus } from '@prisma/client'
import { getEvent } from './event/getEvent'

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

  await prisma.event.update({
    where: { id: eventId },
    data: { deletedAt: new Date() }
  })
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
