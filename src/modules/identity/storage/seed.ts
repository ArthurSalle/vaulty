import { createIdentity } from '../helpers/create-identity'
import { IDENTITY_STORAGE_KEY } from '../helpers/helpers'

const identities = [
  createIdentity({
    firstname: 'John',
    lastname: 'Doe',
    phone: '0602030405',
  }),
  createIdentity({
    firstname: 'Jane',
    lastname: 'Doe',
  }),
  createIdentity({
    firstname: 'Bill',
    lastname: 'Doe',
    phone: '0702030405',
  }),
]

export function seedIdentities() {
  localStorage.setItem(IDENTITY_STORAGE_KEY, JSON.stringify(identities))
}
