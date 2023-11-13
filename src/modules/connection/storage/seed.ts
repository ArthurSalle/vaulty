import { createConnection } from '../helpers/create-connection'
import { CONNECTION_STORAGE_KEY } from '../helpers/helpers'

const passwords = [
  createConnection({
    connection_name: 'Notion',
    website: 'https://www.notion.so/',
    username: 'john.doe@mail.io',
    password: '5678765',
  }),
  createConnection({
    connection_name: 'Alan',
    website: 'https://alan.com/',
    username: 'johndoe',
    password: '1234321',
  }),
  createConnection({
    connection_name: 'Figma',
    website: 'https://figma.com/',
    username: 'john.doe@mail.io',
    password: '4321234',
  }),
  createConnection({
    connection_name: 'Discord',
    website: 'https://discord.com/',
    username: 'doejohn',
    password: '9876789',
  }),
]

export function seedConnections() {
  localStorage.setItem(CONNECTION_STORAGE_KEY, JSON.stringify(passwords))
}
