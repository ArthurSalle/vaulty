import { Separator } from '@/components/ui/separator'
import { CreditCard } from '../helpers/create-credit-card'
import { CreditCardsListItem } from './CreditCardsListItem'

type CreditCardsListProps = {
  creditCards: CreditCard[]
}

export const CreditCardsList = ({ creditCards }: CreditCardsListProps) => {
  return (
    <ul>
      {creditCards.length === 0 ? (
        <span className='block py-4 text-center text-muted-foreground'>
          <i>No identities found</i>
        </span>
      ) : (
        creditCards.map((creditCard, index) => {
          return (
            <div key={creditCard.id}>
              <CreditCardsListItem creditCard={creditCard} />

              {index !== creditCards.length - 1 ? <Separator /> : null}
            </div>
          )
        })
      )}
    </ul>
  )
}
