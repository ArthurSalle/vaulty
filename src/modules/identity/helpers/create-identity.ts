import { z } from 'zod'
import { userSchema } from '../CreateIdentity'

export function createUser(
  values: z.infer<typeof userSchema>,
  { onSuccess, onError }: { onSuccess: () => void; onError: () => void }
) {
  values.phone = values.phone && values.phone.replace(/\s/g, '')

  const existingUsers = localStorage.getItem('users')
  let users = []

  if (existingUsers) {
    users = JSON.parse(existingUsers)
  }

  const userExists = users.some(
    (user: z.infer<typeof userSchema>) =>
      user.firstname.toLowerCase() === values.firstname.toLowerCase() &&
      user.lastname.toLowerCase() === values.lastname.toLowerCase()
  )

  if (!userExists) {
    users.push(values)
    localStorage.setItem('users', JSON.stringify(users))
    if (onSuccess) {
      onSuccess()
    }
  } else if (userExists && users.length) {
    if (onError) {
      onError()
    }
  }
}
