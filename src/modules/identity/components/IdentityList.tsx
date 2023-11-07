import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { Link, NavLink, Outlet, useLoaderData } from 'react-router-dom'
import { Identity } from '../helpers/create-identity'
import { getIdentities } from '../storage/storage'
import {
  capitalizeFirstLetter,
  cn,
  formatPhoneNumber,
  getFirstLetterCapitalized,
  getRelationColor,
} from '@/modules/shared/lib/utils'

export function IdentitiesLoader() {
  let identities = getIdentities()

  return identities
}

export const IdentityList = () => {
  const identities = useLoaderData() as Identity[]

  return (
    <div className='flex w-full'>
      <div className='flex flex-col pt-4 w-full max-w-[320px] border-r flex-shrink-0'>
        <div className='flex gap-3 pb-6 px-4 border-b'>
          <Input placeholder='Search' />

          <Link
            to='/identity/new'
            className={buttonVariants({
              size: 'icon',
            })}
          >
            <Plus size={20} strokeWidth={2.5} />
          </Link>
        </div>

        <ul className='flex flex-col h-full overflow-y-auto'>
          {identities ? (
            identities.map((identity) => {
              return (
                <div key={identity.id}>
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
                          'h-9 w-9 border-2'
                        )}
                      >
                        <AvatarImage src={identity.avatar} alt='Avatar' />
                        <AvatarFallback>
                          {getFirstLetterCapitalized(identity.firstname) +
                            getFirstLetterCapitalized(identity.lastname)}
                        </AvatarFallback>
                      </Avatar>
                      <div className='ml-2 space-y-1'>
                        <p className='text-sm font-medium leading-none'>
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
                  <Separator />
                </div>
              )
            })
          ) : (
            <span className='block py-4 text-center text-muted-foreground'>
              <i>No created identities</i>
            </span>
          )}
        </ul>
      </div>
      <div className='w-full h-full'>
        <Outlet />
      </div>
    </div>
  )
}
