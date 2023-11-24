import { CreditCard, createCreditCard } from '../helpers/create-credit-card'
import { CARDS_STORAGE_KEY } from '../helpers/helpers'
import { CreditCardSchema } from '../helpers/schemas'
import { seedCreditCards } from './seed'

export function getCreditCards() {
  const creditCards = localStorage.getItem(CARDS_STORAGE_KEY)

  if (!creditCards) {
    seedCreditCards()
    return getCreditCards()
  }

  const parsedCreditCards = JSON.parse(creditCards) as CreditCard[]
  return parsedCreditCards
}

export function saveCreditcard(
  value: CreditCardSchema,
  {
    onSuccess,
    onError,
  }: {
    onSuccess: (id: string) => void
    onError: () => void
  }
) {
  const formattedCreditCard = createCreditCard(value)
  const creditCards = getCreditCards() || []

  if (creditCards.push(formattedCreditCard)) {
    localStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(creditCards))
    return onSuccess(formattedCreditCard.id)
  } else {
    return onError()
  }
}
