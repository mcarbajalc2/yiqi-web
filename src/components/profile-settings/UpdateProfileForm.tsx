'use client'
import { useCallback, useMemo, useRef, useState } from 'react'
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
  AtSign,
  FileText,
  BellOff,
  Shield,
  Loader2,
  Save
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import {
  ProfileDataValues,
  profileFormSchema,
  type ProfileFormValues
} from '@/schemas/userSchema'
import { updateUserProfile } from '@/services/actions/userActions'
import { UploadToS3 } from '@/lib/uploadToS3'
import FormFieldWrapper from './FormFieldWrapper'
import ProfilePictureUpload from './UpdatePictureUpload'
import DeleteAccountDialog from './DeleteAccountDialog'

const FORM_SECTIONS = {
  basic: ['name', 'email', 'phoneNumber', 'company'] as const,
  professional: ['position'] as const,
  social: ['x', 'linkedin', 'instagram', 'website'] as const
} as const
type FormField =
  | (typeof FORM_SECTIONS.basic)[number]
  | (typeof FORM_SECTIONS.professional)[number]
  | (typeof FORM_SECTIONS.social)[number]

function UpdateProfileForm({ user }: { user: ProfileDataValues }) {
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
          console.log(error)
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
      console.log(error)
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const renderFormField = (field: FormField) => (
    <FormFieldWrapper
      key={field}
      form={form}
      name={field}
      label={field.charAt(0).toUpperCase() + field.slice(1)}
      placeholder={`Enter your ${field}`}
      icon={socialIcons[field]}
      disabled={field === 'email'}
      type={field === 'website' ? 'url' : 'text'}
    />
  )
  const handleProfilePictureChange = useCallback(
    (file: File) => {
      form.setValue('picture', file, { shouldDirty: true })
    },
    [form]
  )
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <ProfilePictureUpload
                currentValue={form.watch('picture')}
                onChange={handleProfilePictureChange}
                name={form.watch('name')}
                userPicture={user.picture ?? ''}
              />

              <Separator />

              {/* Basic Information */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid gap-6 md:grid-cols-2"
              >
                {FORM_SECTIONS.basic.map(renderFormField)}
              </motion.div>

              <Separator />

              {/* Professional Information */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {FORM_SECTIONS.professional.map(renderFormField)}

                <div className="space-y-2">
                  <label
                    htmlFor="shortDescription"
                    className="text-sm font-medium"
                  >
                    Bio
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Textarea
                      {...form.register('shortDescription')}
                      className="min-h-[100px] pl-9 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                      placeholder="Tell us about yourself"
                    />
                  </div>
                </div>
              </motion.div>

              <Separator />

              {/* Social Links */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid gap-6 md:grid-cols-2"
              >
                {FORM_SECTIONS.social.map(renderFormField)}
              </motion.div>

              <Separator />

              {/* Preferences */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <BellOff className="h-4 w-4" />
                        Stop Communications
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Disable all marketing communications and newsletters
                    </div>
                  </div>
                  <Switch
                    checked={form.watch('stopCommunication')}
                    onCheckedChange={checked =>
                      form.setValue('stopCommunication', checked, {
                        shouldDirty: true
                      })
                    }
                  />
                </div>

                <div className="flex items-center gap-2 rounded-lg border p-4">
                  <Shield className="h-4 w-4" />
                  <div className="flex-1">Role</div>
                  <Badge>User</Badge>
                </div>
              </motion.div>

              <div className="flex items-center justify-between">
                <DeleteAccountDialog />
                <Button
                  type="submit"
                  disabled={isLoading || !isFormDirty}
                  className="flex items-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>Save Changes</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
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
export default UpdateProfileForm
