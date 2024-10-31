import { EventRegistrationSchemaType } from '@/schemas/eventSchema'
import CheckinButton from './CheckinButton'

export default function EventRegistrationTable({
  eventId,
  registrations,
  ticketId
}: {
  eventId: string
  registrations: EventRegistrationSchemaType[]
  ticketId?: string
}) {
  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-4 py-2 text-left">Name</th>
          <th className="px-4 py-2 text-left">Ticket ID</th>
          <th className="px-4 py-2 text-left">Checked In</th>
          <th className="px-4 py-2"></th>
        </tr>
      </thead>
      <tbody>
        {registrations.map(registration =>
          registration.tickets.map(ticket => (
            <tr key={ticket.id} className="border-b">
              <td className="px-4 py-2">{ticket.user?.name || 'N/A'}</td>
              <td className="px-4 py-2">{ticket.id}</td>
              <td className="px-4 py-2">
                {ticket.checkedInDate
                  ? ticket.checkedInDate.toLocaleString()
                  : 'No'}
              </td>
              <td className="px-4 py-2">
                <CheckinButton
                  eventId={eventId}
                  ticket={ticket}
                  selected={ticket.id === ticketId}
                />
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}
