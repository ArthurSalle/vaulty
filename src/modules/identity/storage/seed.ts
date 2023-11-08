import { createIdentity } from '../helpers/create-identity'
import { IDENTITY_STORAGE_KEY } from '../helpers/helpers'

const identities = [
  createIdentity({
    firstname: 'John',
    lastname: 'Doe',
    phone: '0602030405',
    date: new Date('2001-01-01'),
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Smokey',
    genre: 'Man',
    mail: 'john.doe@mail.io',
    relation: 'Myself',
    default_identity: true,
  }),
  createIdentity({
    firstname: 'Jane',
    lastname: 'Doe',
    phone: '0708090405',
    date: new Date('2002-02-02'),
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Mimi',
    genre: 'Woman',
    mail: 'jane.doe@mail.io',
    relation: 'Family',
  }),
  createIdentity({
    firstname: 'Bill',
    lastname: 'Doe',
    phone: '0702030405',
    date: new Date('2003-03-03'),
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Sasha',
    genre: 'Other',
    mail: 'bill.doe@mail.io',
    relation: 'Family',
  }),
]

export function seedIdentities() {
  localStorage.setItem(IDENTITY_STORAGE_KEY, JSON.stringify(identities))
}
