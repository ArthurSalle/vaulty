import { Connection, createConnection } from '../helpers/create-connection'
import { CONNECTION_STORAGE_KEY } from '../helpers/helpers'
import { ConnectionSchema } from '../helpers/schemas'
import { seedConnections } from './seed'

export function getConnections() {
  const connections = localStorage.getItem(CONNECTION_STORAGE_KEY)

  if (!connections) {
    seedConnections()
    return getConnections()
  }

  const parsedConnections = JSON.parse(connections!) as Connection[]

  const sortedConnections = parsedConnections.sort((a, b) =>
    a.connection_name.localeCompare(b.connection_name)
  )

  return sortedConnections
}

export function getConnection(id: string) {
  const connections = getConnections()

  return connections.find((connection) => connection.id === id)
}

export function saveConnection(
  value: ConnectionSchema,
  {
    onSuccess,
    onError,
  }: {
    onSuccess: (id: string) => void
    onError: () => void
  }
) {
  const formattedConnection = createConnection(value)
  const connections = getConnections() || []

  if (connections.push(formattedConnection)) {
    localStorage.setItem(CONNECTION_STORAGE_KEY, JSON.stringify(connections))
    return onSuccess(formattedConnection.id)
  } else {
    return onError()
  }
}

export function deleteConnection(
  id: string,
  {
    onSuccess,
    onError,
  }: {
    onSuccess: () => void
    onError: () => void
  }
) {
  const connections = getConnections()

  const connectionToDeleteIndex = connections.findIndex(
    (connection) => connection.id === id
  )

  if (connectionToDeleteIndex === -1) {
    return onError()
  }

  connections.splice(connectionToDeleteIndex, 1)
  localStorage.setItem(CONNECTION_STORAGE_KEY, JSON.stringify(connections))
  return onSuccess()
}

export function saveEditedConnection(
  value: Connection,
  {
    onSuccess,
    onError,
  }: {
    onSuccess: (id: string) => void
    onError: () => void
  }
) {
  const connections = getConnections()

  const oldConnectionIndex = connections.findIndex(
    (connection: Connection) => connection.id === value.id
  )

  if (oldConnectionIndex !== -1) {
    const oldObject = connections[oldConnectionIndex]
    const updatedObject = { ...oldObject, ...value }
    connections[oldConnectionIndex] = updatedObject
  } else {
    return onError()
  }

  localStorage.setItem(CONNECTION_STORAGE_KEY, JSON.stringify(connections))

  if (onSuccess) {
    return onSuccess(value.id)
  } else {
    return onError()
  }
}
