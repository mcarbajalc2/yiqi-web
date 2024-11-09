'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { Roles } from '@prisma/client'
import { getUser } from '@/lib/auth/lucia'
import { ProfileDataValues ,UserDataCollected,profileDataSchema, } from '@/schemas/userSchema'

import { z } from 'zod'
export async function searchUsers(query: string) {
  return prisma.user.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { email: { contains: query, mode: 'insensitive' } }
      ]
    },
    take: 5
  })
}

export async function makeRegularUser(user: { userId: string }) {
  try {
    await prisma.user.update({
      where: {
        id: user.userId
      },
      data: {
        role: Roles.USER
      }
    })
  } catch (error) {
    throw new Error(`${error}`)
  } finally {
    revalidatePath('/', 'layout')
  }
}

export async function updateUserProfile(
  data: ProfileDataValues,
) {
  const validatedData = profileDataSchema.parse(data)
   try {
    const {id,picture, name, phoneNumber, stopCommunication,email,...socialData } = validatedData
    return await prisma.$transaction(async (tx) => {
      const currentUser = await tx.user.findUnique({
        where: { id: id },
        select: { dataCollected: true }
      });

      const updatedUser = await tx.user.update({
        where: { id: id },
        data: {
          name,
          phoneNumber,
          stopCommunication,
          picture,
          email,
          dataCollected: {
            ...(currentUser?.dataCollected as Record<string, unknown>),
            ...socialData
          }
        }
      });
      revalidatePath('/user/edit');
      return { success: true, user: updatedUser };
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    throw new Error('Failed to update profile');
  }
}
export async function getUserProfile() {
  try {
    const userCurrent = await getUser()
    if (!userCurrent?.id) return null
    const user = await prisma.user.findUnique({
      where: { id: userCurrent.id },
      select: {
        id: true,
        name: true,
        email: true,
        picture: true,
        phoneNumber: true,
        stopCommunication: true,
        dataCollected: true
      }
    })
    if (!user) return null 
    const dataCollected = user.dataCollected as UserDataCollected
    const cleanUserData = {
      id: user.id,
      name: user.name ?? '',
      email: user.email ?? '',
      picture: user.picture ?? '',
      phoneNumber: user.phoneNumber ?? '',
      stopCommunication: user.stopCommunication ?? false,   
      company: dataCollected?.company ?? '',
      position: dataCollected?.position ?? '',
      shortDescription: dataCollected?.shortDescription ?? '',
      linkedin: dataCollected?.linkedin ?? '',
      x: dataCollected?.x ?? '',
      instagram: dataCollected?.instagram ?? '',
      website: dataCollected?.website ?? ''
    }

 
    return profileDataSchema.parse(cleanUserData)
  } catch (error) {
    console.error('Error in getUserProfile:', error)
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors)
    }
    return null
  }
}

export async function deleteUserAccount() {
  try {
    const userCurrent = await getUser()
    if (!userCurrent?.id) return { success: false, error: 'User not found' }

    // Eliminar todas las sesiones asociadas al usuario
    await prisma.session.deleteMany({
      where: { userId: userCurrent.id }
    })

    // Eliminar la cuenta del usuario
    await prisma.user.delete({
      where: { id: userCurrent.id }
    })
    return { success: true }
  } catch (error) {
    console.error('Error deleting user:', error)
    return { success: false, error: 'Failed to delete user' }
  }
}