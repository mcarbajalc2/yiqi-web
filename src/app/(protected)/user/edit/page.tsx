import UpdateProfileForm from '@/components/profile-settings/UpdateProfileForm'
import { getUserProfile } from '@/services/actions/userActions'
import React from 'react'
async function page() {
  const user = await getUserProfile()
  if (!user) {
    return <div>User not found</div>
  }
  return <UpdateProfileForm user={user} />
}

export default page
