'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Send } from 'lucide-react'

import EventRegistrationTable from './events/EventRegistrationTable'
import { EventRegistrationsSchemaType } from '@/services/actions/event/getEventAttendees'

type Props = {
  registrations: EventRegistrationsSchemaType[]
}

export function EventAdminView({ registrations }: Props) {
  const [communications, setCommunications] = useState([
    { id: 1, subject: 'Event Reminder', sentDate: '2023-05-01' },
    { id: 2, subject: 'Schedule Update', sentDate: '2023-05-05' }
  ])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Event Management</h1>
      <Tabs defaultValue="attendees">
        <TabsList className="mb-4">
          <TabsTrigger value="attendees">Attendees</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
        </TabsList>
        <TabsContent value="attendees">
          <h2 className="text-xl font-semibold mb-2">Event Attendees</h2>

          <EventRegistrationTable registrations={registrations} />
        </TabsContent>

        <TabsContent value="communications">
          <h2 className="text-xl font-semibold mb-2">Event Communications</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Sent Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {communications.map(comm => (
                <TableRow key={comm.id}>
                  <TableCell>{comm.subject}</TableCell>
                  <TableCell>{comm.sentDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button className="mt-4">
            <Send className="w-4 h-4 mr-2" /> Send New Communication
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  )
}
