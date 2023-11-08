import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Plus, X } from 'lucide-react'
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
import { ChangeEvent, useEffect, useState } from 'react'

export function IdentitiesLoader() {
  let identities = getIdentities()

  return identities
}

export const IdentityList = () => {
  const identities = useLoaderData() as Identity[]
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState<Identity[]>([])

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
  }

  useEffect(() => {
    const results = identities.filter((identity) => {
      const searchWords = search.trim().toLowerCase().split(' ')
      return searchWords.every(
        (word) =>
          identity.firstname.toLowerCase().includes(word) ||
          identity.lastname.toLowerCase().includes(word)
      )
    })

    setSearchResults(results)
  }, [search])

  return (
    <div className='flex w-full'>
      <div className='flex flex-col pt-4 w-full max-w-[320px] border-r flex-shrink-0'>
        <div className='flex gap-3 pb-6 px-4 border-b'>
          <div className='relative flex items-center w-full'>
            <Input
              placeholder='Search'
              value={search}
              onChange={handleChange}
            />
            {search !== '' && (
              <X
                size={20}
                className='absolute right-2  rounded-full cursor-pointer text-muted-foreground'
                onClick={() => {
                  setSearch('')
                }}
              />
            )}
          </div>

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
          {searchResults.length ? (
            searchResults.map((identity) => {
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
              <i>No identities found</i>
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
