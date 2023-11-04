import { Identity, createIdentity } from '../helpers/create-identity'
import { IDENTITY_STORAGE_KEY } from '../helpers/helpers'
import { IdentitySchema } from '../helpers/schemas'
import { seedIdentities } from './seed'

export function getIdentities() {
  const storage = localStorage.getItem(IDENTITY_STORAGE_KEY)

  if (!storage) {
    seedIdentities()
    return getIdentities()
  }

  return JSON.parse(storage!) as Identity[]
}

export function getIdentity(id: string) {
  const storage = getIdentities()

  return storage.find((identity) => identity.id === id)
}

export function saveIdentity(
  value: IdentitySchema,
  {
    onSuccess,
    onError,
  }: { onSuccess: (id: string) => void; onError: () => void }
) {
  const formatedIdentity = createIdentity(value)
  let storage = getIdentities()

  if (!storage) {
    storage = []
    storage.push(formatedIdentity)
    localStorage.setItem(IDENTITY_STORAGE_KEY, JSON.stringify(storage))
    return onSuccess(formatedIdentity.id)
  }

  const existingId = storage.some(
    (identity) =>
      identity.firstname === formatedIdentity.firstname &&
      identity.lastname === formatedIdentity.lastname
  )

  if (existingId) {
    return onError()
  }

  storage.push(formatedIdentity)
  localStorage.setItem(IDENTITY_STORAGE_KEY, JSON.stringify(storage))
  return onSuccess(formatedIdentity.id)
}
