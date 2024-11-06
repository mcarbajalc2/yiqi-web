import { UseFormReturn } from 'react-hook-form'
import { motion } from 'framer-motion'
import { FileText, BellOff, Shield, Loader2, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { socialIcons } from './profile-settings'

import FormFieldWrapper from './form-field-wrapper'
import ProfilePictureUpload from './profile-picture-upload'
import DeleteAccountDialog from './delete-account-dialog'
import { ProfileDataValues, ProfileFormValues } from '@/schemas/userSchema'
import { FORM_SECTIONS } from '@/constantes/form'
import { useCallback } from 'react'

interface ProfileFormProps {
  form: UseFormReturn<ProfileFormValues>
  onSubmit: (values: ProfileFormValues) => void
  isLoading: boolean
  user: ProfileDataValues
  isFormDirty: boolean
}

type FormField =
  | (typeof FORM_SECTIONS.basic)[number]
  | (typeof FORM_SECTIONS.professional)[number]
  | (typeof FORM_SECTIONS.social)[number]

export default function ProfileForm({
  form,
  onSubmit,
  isLoading,
  user,
  isFormDirty
}: ProfileFormProps) {
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
            <label htmlFor="shortDescription" className="text-sm font-medium">
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
  )
}
