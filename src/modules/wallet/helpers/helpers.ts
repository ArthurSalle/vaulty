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

export function getCreditCardLogo(cardType: string) {
  switch (cardType) {
    case 'Visa':
      return '/src/assets/card-logo/visa.png'
      break
    case 'Mastercard':
      return '/src/assets/card-logo/mastercard.png'
      break
    case 'American Express':
      return '/src/assets/card-logo/amex.png'
      break
    case 'Other':
      return '/src/assets/card-logo/cb.png'
      break

    default:
      return '/src/assets/card-logo/cb.png'
      break
  }
}
