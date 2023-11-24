import { generateId } from '@/modules/shared/lib/utils'
import { CreditCardSchema } from './schemas'

export function createCreditCard(values: CreditCardSchema) {
  return {
    ...values,
    id: generateId(),
  }
}

export type CreditCard = ReturnType<typeof createCreditCard>
