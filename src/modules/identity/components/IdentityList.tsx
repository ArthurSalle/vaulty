import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { Link, Outlet, useLoaderData } from 'react-router-dom'

import { Identity } from '../helpers/create-identity'
import { getIdentities } from '../storage/storage'
import { capitalizeFirstLetter } from '@/modules/shared/lib/utils'

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
          <Button asChild size='icon'>
            <Link to='/identity/new'>
              <Plus size={20} strokeWidth={2.5} />
            </Link>
          </Button>
        </div>

        <ul className='flex flex-col h-full overflow-y-auto'>
          {identities ? (
            identities.map((identity) => {
              return (
                <div key={identity.id}>
                  <li className='flex items-center '>
                    <Button
                      asChild
                      variant='ghost'
                      className='h-full w-full justify-start p-3 rounded-none'
                    >
                      <Link to={`/identity/${identity.id}`}>
                        <Avatar className='h-9 w-9'>
                          <AvatarImage src={identity.avatar} alt='Avatar' />
                          <AvatarFallback>
                            {capitalizeFirstLetter(identity.firstname[0]) +
                              capitalizeFirstLetter(identity.lastname[0])}
                          </AvatarFallback>
                        </Avatar>
                        <div className='ml-2 space-y-1'>
                          <p className='text-sm font-medium leading-none'>
                            {capitalizeFirstLetter(identity.firstname) +
                              ' ' +
                              capitalizeFirstLetter(identity.lastname)}
                          </p>
                          <p className='text-sm text-muted-foreground'>
                            {capitalizeFirstLetter(identity.firstname) +
                              ' ' +
                              capitalizeFirstLetter(identity.lastname)}
                          </p>
                        </div>
                      </Link>
                    </Button>
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
