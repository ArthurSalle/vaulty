import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { buttonVariants } from '@/components/ui/button'
import {
  capitalizeFirstLetter,
  cn,
  formatPhoneNumber,
  getFirstLetterCapitalized,
  getRelationColor,
} from '@/modules/shared/lib/utils'
import { NavLink } from 'react-router-dom'
import { Identity } from '../helpers/create-identity'

type IdentitiesListItemProps = {
  identity: Identity
}

export const IdentitiesListItem = ({ identity }: IdentitiesListItemProps) => {
  return (
    <li className='flex items-center '>
      <NavLink
        to={`/identity/${identity.id}`}
        className={({ isActive }) =>
          cn(
            `${buttonVariants({
              variant: 'ghost',
            })} h-full w-full justify-start p-3 rounded-none`,
            isActive ? 'bg-muted' : ''
          )
        }
      >
        <Avatar
          className={cn(
            getRelationColor(identity.relation!),
            'h-11 w-11 border-2 bg-background'
          )}
        >
          <AvatarImage src={identity.avatar} alt='Avatar' />
          <AvatarFallback className='text-lg font-medium bg-background'>
            {getFirstLetterCapitalized(identity.firstname) +
              getFirstLetterCapitalized(identity.lastname)}
          </AvatarFallback>
        </Avatar>
        <div className='ml-3 space-y-1 block overflow-x-hidden'>
          <p className='text-sm font-medium leading-none truncate'>
            {capitalizeFirstLetter(identity.firstname) +
              ' ' +
              capitalizeFirstLetter(identity.lastname)}
            <span className='ml-1 text-xs text-muted-foreground'>
              {identity.default_identity && '(default)'}
            </span>
          </p>
          <p className='text-sm text-muted-foreground'>
            {identity.phone && formatPhoneNumber(identity.phone)}
          </p>
        </div>
      </NavLink>
    </li>
  )
}
