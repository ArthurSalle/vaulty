import { generateId } from '@/modules/shared/lib/utils'
import { ConnectionSchema } from './schemas'

export function createConnection(values: ConnectionSchema) {
  return { ...values, id: generateId() }
}

export type Connection = ReturnType<typeof createConnection>
