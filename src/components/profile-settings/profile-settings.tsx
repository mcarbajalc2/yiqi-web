'use client'
import { useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import {
  Building2,
  Mail,
  Phone,
  User,
  Briefcase,
  Twitter,
  Linkedin,
  Instagram,
  Globe,
  AtSign
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ProfileForm from './profile-form'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import {
  ProfileDataValues,
  profileFormSchema,
  type ProfileFormValues
} from '@/schemas/userSchema'
import { updateUserProfile } from '@/services/actions/userActions'
import { UploadToS3 } from '@/lib/uploadToS3'

function ProfileSettings({ user }: { user: ProfileDataValues }) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const initialFormState = useRef<ProfileFormValues>({
    name: user.name ?? '',
    email: user.email ?? '',
    phoneNumber: user.phoneNumber ?? '',
    company: user.company ?? '',
    position: user.position ?? '',
    shortDescription: user.shortDescription ?? '',
    linkedin: user.linkedin ?? '',
    x: user.x ?? '',
    instagram: user.instagram ?? '',
    website: user.website ?? '',
    stopCommunication: user.stopCommunication ?? false,
    picture: null
  })

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: initialFormState.current
  })

  const formValues = form.watch()
  const isFormDirty = useMemo(() => {
    return Object.keys(initialFormState.current).some(
      key =>
        initialFormState.current[key as keyof ProfileFormValues] !==
        formValues[key as keyof ProfileFormValues]
    )
  }, [formValues])

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true)
    console.log(data)
    try {
      let imageUrl: string | null = null
      if (data.picture instanceof File) {
        try {
          imageUrl = await UploadToS3(data.picture)
        } catch (error) {
          setIsLoading(false)
          return
        }
      }
      const profileData: ProfileDataValues = {
        ...data,
        picture: imageUrl ?? user.picture,
        id: user.id
      }
      const result = await updateUserProfile(profileData)
      if (result.success) {
        initialFormState.current = data
        router.refresh()
        toast({
          description: 'Profile updated successfully',
          variant: 'default'
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container max-w-4xl pb-10 mx-auto"
    >
      <Card className="bg-transparent border-none">
        <CardHeader>
          <CardTitle className="text-2xl">Profile Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <ProfileForm
            form={form}
            onSubmit={onSubmit}
            isLoading={isLoading}
            user={user}
            isFormDirty={isFormDirty}
          />
        </CardContent>
      </Card>
    </motion.div>
  )
}

export const socialIcons = {
  name: User,
  email: Mail,
  phoneNumber: Phone,
  company: Building2,
  position: Briefcase,
  x: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
  website: Globe,
  username: AtSign
} as const
export default ProfileSettings
