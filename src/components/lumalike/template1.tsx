'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin, Instagram } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import Markdown from 'react-markdown'
import { motion } from 'framer-motion'

export interface Host {
  name: string
  image: string
  instagramUrl?: string
}

export interface Event {
  title: string
  subtitle: string
  date: string
  startTime: string
  endTime: string
  location: string
  city: string
  description: string
  backgroundColor: string
  hosts: Host[]
  featuredIn?: {
    name: string
    url: string
  }
  heroImage: string
}

function Navbar() {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-opacity-80 bg-primary"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold text-primary-foreground">
          yiqi
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/explore"
            className="text-primary-foreground hover:text-secondary transition-colors"
          >
            Explore Events
          </Link>
          <Button variant="secondary">Sign In</Button>
        </div>
      </div>
    </motion.nav>
  )
}

interface HeroImageProps {
  src: string
  alt: string
}

function HeroImage({ src, alt }: HeroImageProps) {
  return (
    <motion.div
      className="relative aspect-video overflow-hidden rounded-xl shadow-2xl"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Image src={src} alt={alt} fill className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
    </motion.div>
  )
}

interface EventDetailsProps {
  title: string
  subtitle: string
  date: string
  startTime: string
  endTime: string
  location: string
  city: string
  featuredIn?: {
    name: string
    url: string
  }
}

function EventDetails({
  title,
  subtitle,
  date,
  startTime,
  endTime,
  location,
  city,
  featuredIn
}: EventDetailsProps) {
  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {featuredIn && (
        <Badge
          variant="secondary"
          className="text-xs flex-row flex items-center gap-2 px-2 py-1 max-w-fit"
        >
          Featured in
          <Link href={featuredIn.url} className="font-medium hover:underline">
            {featuredIn.name}
          </Link>
        </Badge>
      )}
      <h1 className="text-4xl font-bold leading-tight">{title}</h1>
      <p className="text-xl text-white">{subtitle}</p>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-white" />
          <time>
            {date}, {startTime} - {endTime}
          </time>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-white" />
          <address className="not-italic">
            {location}, {city}
          </address>
        </div>
      </div>
    </motion.div>
  )
}

function Registration() {
  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h2 className="text-2xl font-semibold text-white">Registro</h2>
      <Card className="bg-secondary/10 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="rounded-full bg-primary/10 p-2">
              <Calendar className="h-6 w-6 text-primary text-white" />
            </div>
            <div>
              <div className="font-semibold text-lg mb-1 text-white">
                Approval Required
              </div>
              <p className="text-sm text-muted-foreground text-white">
                Your registration is subject to approval by the host.
              </p>
            </div>
          </div>
          <Button size="lg" className="w-full">
            Request to Join
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

interface HostsProps {
  hosts: Host[]
}

function Hosts({ hosts }: HostsProps) {
  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <h2 className="text-2xl font-semibold">Hosted By</h2>
      <div className="grid gap-6 sm:grid-cols-2 ">
        {hosts.map((host, index) => (
          <motion.div
            key={host.name}
            className="flex items-center gap-4 p-4  w-fit rounded-lg bg-secondary/10 backdrop-blur-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
          >
            <Avatar className="h-16 w-16">
              <AvatarImage src={host.image} alt={host.name} />
              <AvatarFallback>{host.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-lg  text-white">
                {host.name}
              </div>
              {host.instagramUrl && (
                <Link
                  href={host.instagramUrl}
                  className="text-sm text-white hover:text-primary transition-colors m-2 flex items-center gap-1 mt-1"
                >
                  <Instagram className="h-4 w-4 text-white" />
                  Instagram
                </Link>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

interface EventDescriptionProps {
  description: string
}

function EventDescription({ description }: EventDescriptionProps) {
  return (
    <motion.div
      className="space-y-4 text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <h2 className="text-2xl font-semibold">About Event</h2>
      <Card className="bg-secondary/10 backdrop-blur-sm text-white">
        <CardContent className="p-6 text-white">
          <div className="prose prose-sm dark:prose-invert text-white max-w-none">
            <Markdown
              components={{
                h1: ({ node, ...props }) => (
                  <h1 style={{ color: 'white' }} {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 style={{ color: 'white' }} {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <h3 style={{ color: 'white' }} {...props} />
                ),
                h4: ({ node, ...props }) => (
                  <h4 style={{ color: 'white' }} {...props} />
                ),
                h5: ({ node, ...props }) => (
                  <h5 style={{ color: 'white' }} {...props} />
                ),
                h6: ({ node, ...props }) => (
                  <h6 style={{ color: 'white' }} {...props} />
                )
              }}
            >
              {description}
            </Markdown>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function EventPage({ event }: { event: Event }) {
  return (
    <>
      <div
        style={{ backgroundColor: event.backgroundColor }}
        className="fixed inset-0 h-screen w-screen -z-10 "
      ></div>
      <main className="container mx-auto px-4 py-12 text-primary-foreground pt-16">
        <div className="grid gap-12 lg:grid-cols-[1fr,400px]">
          <div className="space-y-12">
            <HeroImage src={event.heroImage} alt={event.title} />
            <EventDetails
              title={event.title}
              subtitle={event.subtitle}
              date={event.date}
              startTime={event.startTime}
              endTime={event.endTime}
              location={event.location}
              city={event.city}
              featuredIn={event.featuredIn}
            />
            <EventDescription description={event.description} />
          </div>
          <div className="space-y-12">
            <Registration />
            <Hosts hosts={event.hosts} />
          </div>
        </div>
      </main>
    </>
  )
}
