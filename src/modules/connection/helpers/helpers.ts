import { Connection } from './create-connection'

export const CONNECTION_STORAGE_KEY = 'connections'

function matchSearchWords(searchInput: string, connection: Connection) {
  const searchWords = searchInput.trim().toLowerCase().split(' ')

  return searchWords.every((word) =>
    connection.connection_name.toLowerCase().includes(word)
  )
}

export function filterConnections(
  searchInput: string,
  connections: Connection[]
) {
  const results = connections.filter((connection) =>
    matchSearchWords(searchInput, connection)
  )

  return results
}
