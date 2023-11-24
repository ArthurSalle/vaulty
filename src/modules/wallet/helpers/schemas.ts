import { z } from 'zod'

export const creditCardSchema = z.object({
  bank_name: z.string().min(2, {
    message: 'Bank name must be at least 2 characters.',
  }),
  cardholder_name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  card_number: z.string().length(19, {
    message: 'Card number must be 16 characters.',
  }),
  card_expiration_date: z.string().length(5, {
    message: 'Expiration date must be 4 characters.',
  }),
  card_cvc: z.string().length(3, {
    message: 'CVC must be 3 characters.',
  }),
  default_card: z.boolean().default(false),
  card_type: z.enum(['Visa', 'Mastercard', 'American Express', 'Other']),
})

export const defaultCreditCardSchema = z.object({
  default_card: z.boolean(),
})

export type CreditCardSchema = z.infer<typeof creditCardSchema>
export type DefaultCreditCardSchema = z.infer<typeof defaultCreditCardSchema>
