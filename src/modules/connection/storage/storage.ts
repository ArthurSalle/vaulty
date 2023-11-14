import { Connection, createConnection } from '../helpers/create-connection'
import { CONNECTION_STORAGE_KEY } from '../helpers/helpers'
import { ConnectionSchema } from '../helpers/schemas'
import { seedConnections } from './seed'

export function getConnections() {
  const storage = localStorage.getItem(CONNECTION_STORAGE_KEY)

  if (!storage) {
    seedConnections()
    return getConnections()
  }

  const rawStorage = JSON.parse(storage!) as Connection[]

  const formattedStorage = rawStorage.sort((a, b) =>
    a.connection_name.localeCompare(b.connection_name)
  )

  return formattedStorage
}

export function getConnection(id: string) {
  const storage = getConnections()

  return storage.find((connection) => connection.id === id)
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

  let storage = getConnections()

  if (!storage) {
    storage = []
    storage.push(formattedConnection)
    localStorage.setItem(CONNECTION_STORAGE_KEY, JSON.stringify(storage))
    return onSuccess(formattedConnection.id)
  }

  if (!storage.push(formattedConnection)) {
    return onError()
  }

  localStorage.setItem(CONNECTION_STORAGE_KEY, JSON.stringify(storage))
  return onSuccess(formattedConnection.id)
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
  const storage = getConnections()

  const connectionToDeleteIndex = storage.findIndex(
    (connection: Connection) => connection.id === id
  )

  if (connectionToDeleteIndex !== 1) {
    if (storage.splice(connectionToDeleteIndex, 1)) {
      localStorage.setItem(CONNECTION_STORAGE_KEY, JSON.stringify(storage))
      return onSuccess()
    } else return onError()
  } else return onError()
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
  const storage = getConnections()

  const oldConnectionIndex = storage.findIndex(
    (connection: Connection) => connection.id === value.id
  )

  if (oldConnectionIndex !== -1) {
    const oldObject = storage[oldConnectionIndex]
    const updatedObject = { ...oldObject, ...value }
    storage[oldConnectionIndex] = updatedObject
  } else return onError()

  localStorage.setItem(CONNECTION_STORAGE_KEY, JSON.stringify(storage))

  if (onSuccess) {
    onSuccess(value.id)
  } else {
    onError()
  }
}
