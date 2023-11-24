import { createCreditCard } from '../helpers/create-credit-card'
import { CARDS_STORAGE_KEY } from '../helpers/helpers'

const creditCards = [
  createCreditCard({
    bank_name: 'BNP Paribas',
    cardholder_name: 'John Doe',
    card_number: '1020 3040 5060 7080',
    card_expiration_date: '01/24',
    card_cvc: '987',
    default_card: true,
  }),
  createCreditCard({
    bank_name: 'Société Générale',
    cardholder_name: 'Jane Doe',
    card_number: '8070 6050 4030 2010',
    card_expiration_date: '07/25',
    card_cvc: '789',
    default_card: false,
  }),
  createCreditCard({
    bank_name: 'American Express',
    cardholder_name: 'John Doe',
    card_number: '1122 3344 5566 7788',
    card_expiration_date: '03/24',
    card_cvc: '321',
    default_card: false,
  }),
]

export function seedCreditCards() {
  localStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(creditCards))
}
