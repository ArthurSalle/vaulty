import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, X } from 'lucide-react'
import {
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { getConnections } from '../storage/storage'
import { Connection } from '../helpers/create-connection'
import {
  capitalizeFirstLetter,
  cn,
  getFirstLetterCapitalized,
} from '@/modules/shared/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { ChangeEvent, useEffect, useState } from 'react'

export function ConnectionsLoader() {
  let connections = getConnections()
  return connections
}

export const ConnectionList = () => {
  const connections = useLoaderData() as Connection[]
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState<Connection[]>([])
  const navigate = useNavigate()
  const location = useLocation()

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
  }

  useEffect(() => {
    const results = connections.filter((identity) => {
      const searchWords = search.trim().toLowerCase().split(' ')
      return searchWords.every(
        (word) =>
          identity.connection_name.toLowerCase().includes(word) ||
          identity.connection_name.toLowerCase().includes(word)
      )
    })

    setSearchResults(results)
  }, [search, connections])

  useEffect(() => {
    const firstConnection = connections[0]
    if (
      firstConnection &&
      (location.pathname === '/connection' ||
        location.pathname === '/connection/')
    ) {
      navigate(`/connection/${firstConnection.id}`, {
        replace: true,
      })
    }
  }, [connections, location])

  return (
    <div className='flex w-full h-[100dvh] relative'>
      <div className='flex flex-col pt-4 w-full md:max-w-[250px] lg:max-w-xs max-h-[calc(100dvh-53px)] md:max-h-[100dvh] border-r flex-shrink-0'>
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
                className='absolute right-2 rounded-full cursor-pointer text-muted-foreground'
                onClick={() => {
                  setSearch('')
                }}
              />
            )}
          </div>

          <Link
            to='/connection/new'
            className={buttonVariants({
              size: 'icon',
            })}
          >
            <Plus size={20} strokeWidth={2.5} />
          </Link>
        </div>

        <ul className='flex flex-col h-full overflow-y-auto'>
          {searchResults.length ? (
            searchResults.map((connection, i) => {
              return (
                <div key={connection.id}>
                  <li className='flex items-center '>
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
                      <Avatar className='h-11 w-11 border-2 bg-muted'>
                        <AvatarImage
                          src={
                            connection.website
                              ? `https://www.google.com/s2/favicons?domain=${connection.website}&sz=96`
                              : ''
                          }
                          alt='Avatar'
                        />
                        <AvatarFallback>
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
                          {connection.username && connection.username}
                        </p>
                      </div>
                    </NavLink>
                  </li>

                  {i === searchResults.length - 1 ? null : <Separator />}
                </div>
              )
            })
          ) : (
            <span className='block py-4 text-center text-muted-foreground'>
              <i>No connections found</i>
            </span>
          )}
        </ul>
      </div>

      <div className='w-full h-full min-h-[100dvh]'>
        <Outlet />
      </div>
    </div>
  )
}
