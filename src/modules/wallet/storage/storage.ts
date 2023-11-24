import { CreditCard, createCreditCard } from '../helpers/create-credit-card'
import { CARDS_STORAGE_KEY } from '../helpers/helpers'
import { CreditCardSchema, DefaultCreditCardSchema } from '../helpers/schemas'
import { seedCreditCards } from './seed'

export function getCreditCards() {
  const creditCards = localStorage.getItem(CARDS_STORAGE_KEY)

  if (!creditCards) {
    seedCreditCards()
    return getCreditCards()
  }

  const parsedCreditCards = JSON.parse(creditCards) as CreditCard[]

  const sortedCreditCards = parsedCreditCards.sort(
    //@ts-ignore
    (a, b) => b.default_card - a.default_card
  )

  return sortedCreditCards
}

export function getCreditCard(id: string) {
  const creditCards = getCreditCards()

  return creditCards.find((card) => card.id === id)
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

export function saveAsDefaultCreditCard(
  value: DefaultCreditCardSchema,
  id: string,
  {
    onSet,
    onUnset,
  }: { onSet: (id: string) => void; onUnset: (id: string) => void }
) {
  const creditCards = getCreditCards()
  const creditCardToUpdate = creditCards.find(
    (creditCard) => creditCard.id === id
  )

  const updatedCreditCard = {
    ...creditCardToUpdate,
    default_card: value.default_card,
  }

  const updatedCreditCards = creditCards.map((creditCard) => {
    if (creditCard.id === updatedCreditCard.id) {
      return updatedCreditCard
    } else {
      return { ...creditCard, default_card: false }
    }
  })

  localStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(updatedCreditCards))
  getCreditCards()

  if (value.default_card) {
    return onSet(id)
  } else return onUnset(id)
}

export function deleteCreditCard(
  id: string,
  {
    onSuccess,
    onError,
  }: {
    onSuccess: () => void
    onError: () => void
  }
) {
  const creditCards = getCreditCards()

  const creditCardToDeleteIndex = creditCards.findIndex(
    (creditCard) => creditCard.id === id
  )

  if (creditCardToDeleteIndex !== -1) {
    creditCards.splice(creditCardToDeleteIndex, 1)
    localStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(creditCards))
    return onSuccess()
  } else {
    return onError()
  }
}

export function saveEditedCreditCard(
  value: CreditCard,
  {
    onSuccess,
    onError,
  }: {
    onSuccess: (id: string) => void
    onError: () => void
  }
) {
  const creditCards = getCreditCards()

  const oldCreditCardIndex = creditCards.findIndex(
    (creditCard) => creditCard.id === value.id
  )

  if (oldCreditCardIndex !== -1) {
    const oldObject = creditCards[oldCreditCardIndex]
    const updatedObject = { ...oldObject, ...value }
    creditCards[oldCreditCardIndex] = updatedObject
  } else {
    return onError()
  }

  localStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(creditCards))

  if (onSuccess) {
    return onSuccess(value.id)
  } else {
    return onError()
  }
}
