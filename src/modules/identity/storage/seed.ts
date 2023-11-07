import { createIdentity } from '../helpers/create-identity'
import { IDENTITY_STORAGE_KEY } from '../helpers/helpers'

const identities = [
  createIdentity({
    firstname: 'John',
    lastname: 'Doe',
    phone: '0602030405',
    date: new Date('01/01/2001'),
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
    date: new Date('02/02/2002'),
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Mimi',
    genre: 'Woman',
    mail: 'jane.doe@mail.io',
    relation: 'Family',
  }),
  createIdentity({
    firstname: 'Bill',
    lastname: 'Doe',
    phone: '0702030405',
    date: new Date('03/03/2003'),
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Sasha',
    genre: 'Other',
    mail: 'bill.doe@mail.io',
    relation: 'Family',
  }),
]

export function seedIdentities() {
  localStorage.setItem(IDENTITY_STORAGE_KEY, JSON.stringify(identities))
}
