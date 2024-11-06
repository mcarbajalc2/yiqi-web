import { LucideIcon } from 'lucide-react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { UseFormReturn } from 'react-hook-form'
import { ProfileFormValues } from '@/schemas/userSchema'
// import { ProfileFormValues } from './schema'

interface FormFieldWrapperProps {
  form: UseFormReturn<ProfileFormValues>
  name: keyof ProfileFormValues
  label: string
  placeholder: string
  icon: LucideIcon
  disabled?: boolean
  type?: string
}

export default function FormFieldWrapper({
  form,
  name,
  label,
  placeholder,
  icon: Icon,
  disabled = false,
  type = 'text'
}: FormFieldWrapperProps) {
  return (
    <div>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <div className="relative">
                <Icon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type={type}
                  className="pl-9 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                  placeholder={placeholder}
                  disabled={disabled}
                  {...field}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
