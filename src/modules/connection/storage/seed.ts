import { createConnection } from '../helpers/create-connection'
import { CONNECTION_STORAGE_KEY } from '../helpers/helpers'

const passwords = [
  createConnection({
    connection_name: 'Notion',
    website: 'https://www.notion.so/',
    username: 'john.doe@mail.io',
    password: 'Us^Qyrf*dbzg#',
  }),
  createConnection({
    connection_name: 'Alan',
    website: 'https://alan.com/',
    username: 'johndoe',
    password: '257107',
  }),
  createConnection({
    connection_name: 'Figma',
    website: 'https://figma.com/',
    username: 'john.doe@mail.io',
    password: '@LDpNf%E',
  }),
  createConnection({
    connection_name: 'Discord',
    website: 'https://discord.com/',
    username: 'doejohn',
    password: '^YeI5ZFJJ',
  }),
]

export function seedConnections() {
  localStorage.setItem(CONNECTION_STORAGE_KEY, JSON.stringify(passwords))
}
