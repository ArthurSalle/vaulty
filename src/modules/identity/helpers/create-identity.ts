import { generateId } from '@/modules/shared/lib/utils'
import { IdentitySchema } from './schemas'
import { format } from 'date-fns'

export function createIdentity(values: IdentitySchema) {
  const parsedPhoneNumber = values?.phone?.replace(/\s/g, '')
  const formattedDate = values.date && format(values.date, 'dd/MM/yyyy')

  return {
    ...values,
    id: generateId(),
    phone: parsedPhoneNumber,
    date: formattedDate,
  }
}

export type Identity = ReturnType<typeof createIdentity>
