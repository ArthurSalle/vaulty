import { CreditCard } from './create-credit-card'

export const CARDS_STORAGE_KEY = 'credit_cards'

function matchSearchWords(searchInput: string, creditCard: CreditCard) {
  const searchWords = searchInput.trim().toLowerCase().split(' ')

  return searchWords.every((word) =>
    creditCard.bank_name.toLowerCase().includes(word)
  )
}

export function filterCreditCards(
  searchInput: string,
  creditCards: CreditCard[]
) {
  const results = creditCards.filter((creditCard) =>
    matchSearchWords(searchInput, creditCard)
  )

  return results
}
