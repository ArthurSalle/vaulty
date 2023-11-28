import { NavLink } from 'react-router-dom'
import { CreditCard } from '../helpers/create-credit-card'
import {
  capitalizeFirstLetter,
  cn,
  getFirstLetterCapitalized,
} from '@/modules/shared/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getCreditCardLogo } from '../helpers/helpers'

type CreditCardsListItemProps = {
  creditCard: CreditCard
}

export const CreditCardsListItem = ({
  creditCard,
}: CreditCardsListItemProps) => {
  return (
    <li className='flex items-center '>
      <NavLink
        to={`/wallet/${creditCard.id}`}
        className={({ isActive }) =>
          cn(
            `${buttonVariants({
              variant: 'ghost',
            })} h-full w-full justify-start p-3 rounded-none`,
            isActive ? 'bg-muted' : ''
          )
        }
      >
        <Avatar className='h-11 w-11 border-2 bg-background'>
          <AvatarImage
            src={getCreditCardLogo(creditCard.card_type)}
            alt='card-logo'
          />
          <AvatarFallback className='text-lg font-medium bg-background'>
            {creditCard.bank_name.split(' ').map((el) => {
              return getFirstLetterCapitalized(el)
            })}
          </AvatarFallback>
        </Avatar>

        <div className='ml-3 space-y-1 block overflow-x-hidden'>
          <p className='text-sm font-medium leading-none truncate'>
            {capitalizeFirstLetter(creditCard.bank_name)}
            <span className='ml-1 text-xs text-muted-foreground'>
              {creditCard.default_card ? '(default)' : null}
            </span>
          </p>
          <p className='text-sm text-muted-foreground'>
            {creditCard.cardholder_name}
          </p>
        </div>
      </NavLink>
    </li>
  )
}
