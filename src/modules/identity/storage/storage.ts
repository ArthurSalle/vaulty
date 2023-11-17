import { Identity, createIdentity } from '../helpers/create-identity'
import { IDENTITY_STORAGE_KEY } from '../helpers/helpers'
import { DefaultIdentitySchema, IdentitySchema } from '../helpers/schemas'
import { seedIdentities } from './seed'

export function getIdentities() {
  const identities = localStorage.getItem(IDENTITY_STORAGE_KEY)

  if (!identities) {
    seedIdentities()
    return getIdentities()
  }

  const parsedIdentities = JSON.parse(identities!) as Identity[]

  const sortedIdentities = parsedIdentities.sort(
    //@ts-ignore
    (a, b) => b.default_identity - a.default_identity
  )

  return sortedIdentities
}

export function getIdentity(id: string) {
  const identities = getIdentities()

  return identities.find((identity) => identity.id === id)
}

export function saveIdentity(
  value: IdentitySchema,
  {
    onSuccess,
    onError,
  }: { onSuccess: (id: string) => void; onError: () => void }
) {
  const formatedIdentity = createIdentity(value)
  const identities = getIdentities() || []

  if (identities.push(formatedIdentity)) {
    localStorage.setItem(IDENTITY_STORAGE_KEY, JSON.stringify(identities))
    return onSuccess(formatedIdentity.id)
  } else {
    return onError()
  }
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
  const identities = localStorage.getItem(IDENTITY_STORAGE_KEY)
  let parsedIdentities = JSON.parse(identities!)

  const oldIdentityIndex = parsedIdentities.findIndex(
    (identity: Identity) => identity.id === value.id
  )

  if (oldIdentityIndex !== -1) {
    const oldObject = parsedIdentities[oldIdentityIndex]

    const areObjectsIdentical =
      JSON.stringify(oldObject) === JSON.stringify(value)

    if (!areObjectsIdentical) {
      const updatedObject = { ...oldObject, ...value }
      parsedIdentities[oldIdentityIndex] = updatedObject
    } else {
      return onError('no modifications')
    }
  }

  localStorage.setItem(IDENTITY_STORAGE_KEY, JSON.stringify(parsedIdentities))

  if (onSuccess) {
    onSuccess(value.id)
  } else {
    onError('error')
  }
}

export function deleteIdentity(
  id: string,
  {
    onSuccess,
    onError,
  }: {
    onSuccess: () => void
    onError: () => void
  }
) {
  const identities = JSON.parse(localStorage.getItem(IDENTITY_STORAGE_KEY)!)

  const identityToDeleteIndex = identities.findIndex(
    (identity: Identity) => identity.id === id
  )

  if (identityToDeleteIndex !== -1) {
    identities.splice(identityToDeleteIndex, 1)
    localStorage.setItem(IDENTITY_STORAGE_KEY, JSON.stringify(identities))
    return onSuccess()
  } else return onError()
}
