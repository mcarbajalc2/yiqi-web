import { z } from 'zod'

// inputs and output must always be zod based so that we can export
// Todo: Update this shema , delete userSchema 
export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.date().nullable(),
  picture: z.string().nullable(),
  phoneNumber: z.string().nullable()
})


export const baseProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().optional().nullable(),
  company: z.string().optional().nullable(),
  position: z.string().optional().nullable(),
  shortDescription: z.string().optional().nullable(),
  linkedin: z.string().url('Invalid URL for LinkedIn').optional().nullable().or(z.literal('')),
  x: z.string().url('Invalid URL for X').optional().nullable().or(z.literal('')),
  instagram: z.string().url('Invalid URL for Instagram').optional().nullable().or(z.literal('')),
  website: z.string().url('Invalid URL for Website').optional().nullable().or(z.literal('')),
  stopCommunication: z.boolean().default(false),
});
export const profileFormSchema = baseProfileSchema.extend({
   picture: z.any()
});
export const profileDataSchema = baseProfileSchema.extend({
  picture: z.string(),
  id: z.string(),
});

export type ProfileDataValues = z.infer<typeof profileDataSchema>;
export type ProfileFormValues = z.infer<typeof profileFormSchema>;



