'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { createEvent } from '@/services/actions/eventActions'
import { EventInputSchema, EventTicketInputType } from '@/schemas/eventSchema'
import { useParams, useRouter } from 'next/navigation'
import { MapPin, Clock, Users } from 'lucide-react'
import { useState } from 'react'
import { TicketTypesManager } from './TicketTypesManager'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { UploadToS3 } from '@/lib/uploadToS3'
import Image from 'next/image'
import { AddressAutocomplete } from '../forms/AddressAutocomplete'

type Props = {
  organizationId: string
}

function CreateEventForm({ organizationId }: Props) {
  const params = useParams()
  const router = useRouter()
  const [tickets, setTickets] = useState<EventTicketInputType[]>([
    {
      name: 'General',
      category: 'GENERAL',
      description: '',
      price: 0,
      limit: 100,
      ticketsPerPurchase: 1
    }
  ])
  const [showTicketManager, setShowTicketManager] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const form = useForm<z.infer<typeof EventInputSchema>>({
    resolver: zodResolver(EventInputSchema),
    defaultValues: {
      title: '',
      startDate: '',
      startTime: '10:00',
      endDate: '',
      endTime: '11:00',
      location: '',
      virtualLink: '',
      description: '',
      maxAttendees: undefined,
      requiresApproval: false,
      tickets: [
        {
          name: 'General',
          category: 'GENERAL',
          description: '',
          price: 0,
          limit: 100,
          ticketsPerPurchase: 1
        }
      ]
    }
  })

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      // Create preview URL
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)
    }
  }

  async function onSubmit(values: z.infer<typeof EventInputSchema>) {
    try {
      let imageUrl = null
      if (selectedImage) {
        imageUrl = await UploadToS3(selectedImage)
      }

      const startDateTime = new Date(`${values.startDate}T${values.startTime}`)
      const endDateTime = new Date(`${values.endDate}T${values.endTime}`)

      const eventData = {
        ...values,
        startDate: startDateTime.toISOString(),
        endDate: endDateTime.toISOString(),
        tickets,
        openGraphImage: imageUrl // Add the image URL to the payload
      }

      await createEvent(organizationId, eventData)
      router.push(`/admin/organizations/${params.id}/events`)
    } catch (error) {
      console.error('Failed to create event:', error)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={e => {
          console.log('onSubmit', e)
          try {
            form.handleSubmit(onSubmit)(e)
          } catch (error) {
            console.error('Failed to create event:', error)
          }
        }}
        className="max-w-4xl mx-auto"
      >
        <div className="grid grid-cols-[300px,1fr] gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <label htmlFor="image-upload">
                <div className="aspect-square bg-gray-100 rounded-md mb-2 relative overflow-hidden">
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="Event preview"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <span className="text-sm text-gray-500">
                        Select an Image
                      </span>
                    </div>
                  )}
                </div>
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageSelect}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Event Name */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Event Name"
                      className="text-xl border-0 px-0 focus-visible:ring-0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date and Time */}
            <div className="flex items-start gap-2">
              <Clock className="h-5 w-5 mt-2" />
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="mb-2">Start</div>
                    <div className="grid grid-cols-2 gap-2">
                      <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="startTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mb-2">End</div>
                    <div className="grid grid-cols-2 gap-2">
                      <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="endTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
                <Select defaultValue="GMT-05:00">
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GMT-05:00">GMT-05:00 Lima</SelectItem>
                    {/* Add more timezones as needed */}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <AddressAutocomplete
                        fieldName="location"
                        onSetAddress={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Add Description"
                      className="resize-none min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Event Options */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Event Options</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <span>Require Approval</span>
                  </div>
                  <FormField
                    control={form.control}
                    name="requiresApproval"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <span>Capacity</span>
                  </div>
                  <FormField
                    control={form.control}
                    name="maxAttendees"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Unlimited"
                            className="w-32 text-right"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Tickets */}
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setShowTicketManager(true)}
            >
              <span>Tickets</span>
              <span className="text-blue-500">Free</span>
            </div>

            {showTicketManager && (
              <TicketTypesManager
                tickets={tickets}
                onUpdate={newTickets => {
                  setTickets(newTickets)
                  setShowTicketManager(false)
                }}
              />
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <Button type="submit" className="w-full">
                Create Event
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}

export { CreateEventForm }
