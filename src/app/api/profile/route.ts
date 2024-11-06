import { NextRequest, NextResponse } from 'next/server'

import { updateUserProfile } from '@/services/actions/userActions'
import { getUser } from '@/lib/auth/lucia'


export async function PUT(request: NextRequest) {
  try {
   
    const currentUser = await getUser()
  if (!currentUser) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    const data = await request.json()
    const result = await updateUserProfile(currentUser.id, data)
    return NextResponse.json(result)
  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    )
  }
}