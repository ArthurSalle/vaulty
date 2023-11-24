import { NavLink } from 'react-router-dom'
import { Connection } from '../helpers/create-connection'
import {
  capitalizeFirstLetter,
  cn,
  getFirstLetterCapitalized,
} from '@/modules/shared/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type ConnectionListItemProps = {
  connection: Connection
}

export const ConnectionsListItem = ({
  connection,
}: ConnectionListItemProps) => {
  return (
    <NavLink
      to={`/connection/${connection.id}`}
      className={({ isActive }) =>
        cn(
          `${buttonVariants({
            variant: 'ghost',
          })} h-full w-full justify-start p-3 rounded-none`,
          isActive ? 'bg-muted' : ''
        )
      }
    >
      <Avatar className='h-11 w-11 border-2 bg-white'>
        <AvatarImage
          src={
            connection.website
              ? `https://www.google.com/s2/favicons?domain=${connection.website}&sz=96`
              : ''
          }
          alt='Avatar'
        />
        <AvatarFallback className='text-2xl font-medium bg-white'>
          {connection.connection_name?.split(' ').map((el) => {
            return getFirstLetterCapitalized(el)
          })}
        </AvatarFallback>
      </Avatar>
      <div className='ml-3 block overflow-x-hidden'>
        <p className='text-sm font-medium truncate'>
          {connection.connection_name?.split(' ').map((el) => {
            return capitalizeFirstLetter(el) + ' '
          })}
        </p>
        <p className='text-sm text-muted-foreground'>
          {connection.username ? connection.username : null}
        </p>
      </div>
    </NavLink>
  )
}
