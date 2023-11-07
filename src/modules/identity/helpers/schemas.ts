import { z } from 'zod'

export const avatarUrl = [
  'https://api.dicebear.com/7.x/notionists/svg?seed=Smokey',
  'https://api.dicebear.com/7.x/notionists/svg?seed=Mimi',
  'https://api.dicebear.com/7.x/notionists/svg?seed=Sasha',
  'https://api.dicebear.com/7.x/notionists/svg?seed=Molly',
  'https://api.dicebear.com/7.x/notionists/svg?seed=Ginger',
] as const

export const identitySchema = z.object({
  firstname: z.string().min(2, {
    message: 'Firstname must be at least 2 characters.',
  }),
  lastname: z.string().min(2, {
    message: 'Lastname must be at least 2 characters.',
  }),
  phone: z
    .union([
      z.string().length(10, {
        message: 'Phone number must be 10 characters.',
      }),
      z.string().refine((val) => val === ''),
    ])
    .optional(),
  mail: z
    .union([
      z.string().email({ message: 'Invalid email address' }),
      z.string().refine((val) => val === ''),
    ])
    .optional(),
  date: z.coerce.date().optional(),
  genre: z.enum(['Man', 'Woman', 'Other']).optional(),
  relation: z
    .enum(['Myself', 'Family', 'Friends', 'Work mates', 'Other'])
    .optional(),
  avatar: z
    .union([
      z.string().url({ message: 'Invalid url' }),
      z.string().refine((val) => val === ''),
    ])
    .optional(),
  default_identity: z.boolean().optional(),
})

export const defaultIdentitySchema = z.object({
  default_identity: z.boolean().default(false).optional(),
})

export type IdentitySchema = z.infer<typeof identitySchema>
export type DefaultIdentitySchema = z.infer<typeof defaultIdentitySchema>
