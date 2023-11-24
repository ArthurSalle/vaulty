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
      return 'public/card-logo/visa.png'
      break
    case 'Mastercard':
      return 'public/card-logo/mastercard.png'
      break
    case 'American Express':
      return 'public/card-logo/amex.png'
      break
    case 'Other':
      return 'public/card-logo/cb.png'
      break

    default:
      return 'public/card-logo/cb.png'
      break
  }
}
