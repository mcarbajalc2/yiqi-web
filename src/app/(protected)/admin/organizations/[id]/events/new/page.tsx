import { CreateEventForm } from '@/components/events/createEventForm'

export default function NewEventPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen p-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Create New Event</h1>
        <CreateEventForm organizationId={params.id} />
      </div>
    </div>
  )
}
