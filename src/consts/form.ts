export const FORM_SECTIONS = {
  basic: ['name', 'email', 'phoneNumber', 'company'] as const,
  professional: ['position'] as const,
  social: ['x', 'linkedin', 'instagram', 'website'] as const
} as const;