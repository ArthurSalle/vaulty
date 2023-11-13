import { z } from 'zod'

export const connectionSchema = z.object({
  connection_name: z.string().min(2, {
    message: 'Connection name must be at least 2 characters.',
  }),
  website: z
    .union([
      z.string().url({ message: 'Please enter a valid url' }),
      z.string().refine((val) => val === ''),
    ])
    .optional(),
  username: z.string(),
  password: z.string(),
})

export type ConnectionSchema = z.infer<typeof connectionSchema>
