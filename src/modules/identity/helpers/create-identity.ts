import { generateId } from '@/modules/shared/lib/utils'
import { IdentitySchema } from './schemas'

export function createIdentity(values: IdentitySchema) {
  const parsedPhoneNumber = values?.phone?.replace(/\s/g, '')

  return {
    ...values,
    id: generateId(),
    phone: parsedPhoneNumber,
  }
}

export type Identity = ReturnType<typeof createIdentity>
