import { Identity, createIdentity } from '../helpers/create-identity'
import { IDENTITY_STORAGE_KEY } from '../helpers/helpers'
import { DefaultIdentitySchema, IdentitySchema } from '../helpers/schemas'
import { seedIdentities } from './seed'

export function getIdentities() {
  const storage = localStorage.getItem(IDENTITY_STORAGE_KEY)

  if (!storage) {
    seedIdentities()
    return getIdentities()
  }

  let formattedStorage = JSON.parse(storage!)

  formattedStorage = formattedStorage.sort(
    (a: any, b: any) => b.default_identity - a.default_identity
  )

  return formattedStorage as Identity[]
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

export function saveAsDefaultIdentity(
  value: DefaultIdentitySchema,
  id: string,
  {
    onSet,
    onUnset,
  }: { onSet: (id: string) => void; onUnset: (id: string) => void }
) {
  const identities = getIdentities()
  const identityToUpdate = identities.find((identity) => identity.id === id)

  const updatedIdentity = {
    ...identityToUpdate,
    default_identity: value.default_identity,
  }

  const updatedIdentities = identities.map((identity) => {
    if (identity.id === updatedIdentity.id) {
      return updatedIdentity
    } else {
      return { ...identity, default_identity: false }
    }
  })

  localStorage.setItem(IDENTITY_STORAGE_KEY, JSON.stringify(updatedIdentities))
  getIdentities()
  if (value.default_identity) {
    return onSet(id)
  } else return onUnset(id)
}

export function saveEditedIdentity(
  value: Identity,
  {
    onSuccess,
    onError,
  }: { onSuccess: (id: string) => void; onError: (errorDetail: string) => void }
) {
  const storage = localStorage.getItem(IDENTITY_STORAGE_KEY)
  let formattedStorage = JSON.parse(storage!)

  const oldIdentityIndex = formattedStorage.findIndex(
    (identity: Identity) => identity.id === value.id
  )

  if (oldIdentityIndex !== -1) {
    const oldObject = formattedStorage[oldIdentityIndex]

    const areObjectsIdentical =
      JSON.stringify(oldObject) === JSON.stringify(value)

    if (!areObjectsIdentical) {
      const updatedObject = { ...oldObject, ...value }
      formattedStorage[oldIdentityIndex] = updatedObject
    } else {
      return onError('no modifications')
    }
  }

  localStorage.setItem(IDENTITY_STORAGE_KEY, JSON.stringify(formattedStorage))

  if (onSuccess) {
    onSuccess(value.id)
  } else {
    onError('error')
  }
}
