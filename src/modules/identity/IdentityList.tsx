import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useLoaderData } from 'react-router-dom'

type Identity = {
  firstname: string
  lastname: string
  phone: string
}

export async function IdentitiesLoader() {
  let identities = localStorage.getItem('users')

  if (identities) {
    identities = JSON.parse(identities)
  }
  return identities
}

export const IdentityList = () => {
  const identities = useLoaderData() as Identity[]

  return (
    <div className='flex'>
      <div className='flex flex-col gap-6 py-4 w-full max-w-[320px] border-r'>
        <div className='flex gap-3 px-4'>
          <Input placeholder='Search' />
          <Button size='icon'>
            <Plus size={20} strokeWidth={2.5} />
          </Button>
        </div>

        <ul className='flex flex-col'>
          {identities ? (
            identities.map((identity, index) => {
              return (
                <div key={index}>
                  <li className='flex items-center '>
                    <Button
                      variant='ghost'
                      className='h-full w-full justify-start p-3 rounded-none'
                    >
                      <Avatar className='h-9 w-9'>
                        <AvatarImage src='' alt='Avatar' />
                        <AvatarFallback>
                          {identity.firstname[0] + identity.lastname[0]}
                        </AvatarFallback>
                      </Avatar>

                      <div className='ml-2 space-y-1'>
                        <p className='text-sm font-medium leading-none'>
                          {identity.firstname + ' ' + identity.lastname}
                        </p>
                        <p className='text-sm text-muted-foreground'>
                          {identity.firstname + ' ' + identity.lastname}
                        </p>
                      </div>
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
      <div>hello</div>
    </div>
  )
}
