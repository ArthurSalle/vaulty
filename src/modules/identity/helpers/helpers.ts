import { Identity } from './create-identity'

export const IDENTITY_STORAGE_KEY = 'identities'

function matchSearchWords(searchInput: string, identity: Identity) {
  const searchWords = searchInput.trim().toLowerCase().split(' ')

  return searchWords.every(
    (word) =>
      identity.firstname.toLowerCase().includes(word) ||
      identity.lastname.toLowerCase().includes(word)
  )
}

export function filterIdentities(searchInput: string, identities: Identity[]) {
  const results = identities.filter((identity) =>
    matchSearchWords(searchInput, identity)
  )

  return results
}
