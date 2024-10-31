import CommunityHighlights from '@/components/mainLanding/CommunityHighlights'
import Features from '@/components/mainLanding/Features'
import Footer from '@/components/mainLanding/Footer'
import Header from '@/components/mainLanding/header'
import Hero from '@/components/mainLanding/hero'
import UpcomingEvents from '@/components/mainLanding/UpcomingEvents'
import { eventListItem } from '@/data/events'

export default function Home() {
  return (
    <main className="bg-black">
      <Header />
      {/* Hero Section */}
      <Hero />
      {/* Features Section */}
      <div className="lg:max-w-[80%] max-w-[90%] mx-auto">
        <Features />
        {/* Community Highlights */}
        <CommunityHighlights />
        {/* Upcoming Events Section */}
        <UpcomingEvents events={eventListItem} />
      </div>
      <Footer />
    </main>
  )
}
