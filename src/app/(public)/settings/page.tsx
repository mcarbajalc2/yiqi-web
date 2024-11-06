import ProfileSettings from '@/components/profile-settings/profile-settings'
import { getUser } from '@/lib/auth/lucia'
import { getUserProfile } from '@/services/actions/userActions'
import { redirect } from 'next/navigation'
import React from 'react'
async function page() {
  const sesion = await getUser()
  if (!sesion?.id) {
    redirect('/auth')
  }
  const user = await getUserProfile()
  if (!user) {
    redirect('/auth')
  }
  return <ProfileSettings user={user} />
}

export default page
