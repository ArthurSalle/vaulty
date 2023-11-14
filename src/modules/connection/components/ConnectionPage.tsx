import {
  ActionFunctionArgs,
  LoaderFunction,
  NavLink,
  redirect,
  useLoaderData,
} from 'react-router-dom'
import { getConnection } from '../storage/storage'
import { Button, buttonVariants } from '@/components/ui/button'
import { ArrowLeft, Edit, Eye, EyeOff, Trash2 } from 'lucide-react'
import { Connection } from '../helpers/create-connection'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { DeleteConnection } from './DeleteConnection'
import {
  capitalizeFirstLetter,
  getFirstLetterCapitalized,
} from '@/modules/shared/lib/utils'

export const ConnectionLoader: LoaderFunction = ({ params }) => {
  const connection = getConnection(params.connectionId!)
  if (!connection) {
    return redirect('/connection')
  }
  return connection
}

export async function action({ request }: ActionFunctionArgs) {
  const data = (await request.json()) as { connectionId: string }
  return redirect(`/connection/${data.connectionId}`)
}

export const ConnectionPage = () => {
  const connection = useLoaderData() as Connection
  // const { connectionId } = useParams()
  const [visibility, setVisibily] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState(false)

  return (
    <div className='bg-white h-[calc(100dvh-53px)] md:h-screen overflow-y-auto absolute inset-0 md:relative'>
      <div className='py-2 px-4 md:hidden flex justify-between items-center border-b'>
        <div>
          <NavLink
            to='/connection'
            className={buttonVariants({
              size: 'icon',
              variant: 'outline',
            })}
          >
            <ArrowLeft size={20} strokeWidth={2.5} />
          </NavLink>
        </div>

        <div className='flex items-center gap-2'>
          <NavLink
            to={`/connection/${connection.id}/edit`}
            className={buttonVariants({ size: 'icon', variant: 'outline' })}
          >
            <Edit className='h-5' />
          </NavLink>
          <Button
            variant='outline'
            size='icon'
            onClick={() => setIsOpenModal(true)}
          >
            <Trash2 className='h-5 text-customred' />
          </Button>
        </div>
      </div>

      <div className='py-4 md:py-8 px-4 md:px-12 flex flex-col justify-between max-h-[calc(100%-57px)] md:max-h-[100dvh] h-full'>
        <div className='flex flex-col gap-2'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-6'>
              <Avatar className='h-14 md:h-20 w-14 md:w-20 border-4 md:drop-shadow-xl bg-muted'>
                <AvatarImage
                  src={
                    connection.website
                      ? `https://www.google.com/s2/favicons?domain=${connection.website}&sz=96`
                      : ''
                  }
                  alt={`${connection.connection_name} logo`}
                />
                <AvatarFallback className='text-2xl font-medium'>
                  {connection.connection_name?.split(' ').map((el) => {
                    return getFirstLetterCapitalized(el)
                  })}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className='text-2xl font-medium'>
                  {connection.connection_name?.split(' ').map((el) => {
                    return capitalizeFirstLetter(el) + ' '
                  })}
                </h1>
              </div>
            </div>
            <div className='md:flex gap-2 items-center hidden'>
              <NavLink
                to={`/connection/${connection.id}/edit`}
                className={buttonVariants({ size: 'icon', variant: 'outline' })}
              >
                <Edit className='h-5' />
              </NavLink>
              <Button
                variant='outline'
                size='icon'
                onClick={() => setIsOpenModal(true)}
              >
                <Trash2 className='h-5 text-customred' />
              </Button>
            </div>
          </div>

          <div className='flex flex-col gap-2 lg:gap-4 md:mt-6 lg:mt-12 mx-auto max-w-xl w-full'>
            <div className='flex flex-col gap-2'>
              <div className='w-full'>
                <Label>Username/Email</Label>
                <Input
                  value={connection.username}
                  readOnly
                  className='mt-2 focus-visible:ring-transparent'
                />
              </div>
              <div className='w-full'>
                <Label>Password</Label>
                <div className='relative flex items-center'>
                  <Input
                    readOnly
                    value={connection.password}
                    type={visibility ? 'text' : 'password'}
                    className='mt-2 focus-visible:ring-transparent'
                  />
                  {connection.password !== '' ? (
                    visibility ? (
                      <EyeOff
                        className='absolute right-4 mt-2 cursor-pointer text-muted-foreground'
                        onClick={() => {
                          setVisibily(!visibility)
                        }}
                      />
                    ) : (
                      <Eye
                        className='absolute right-4 mt-2 cursor-pointer text-muted-foreground'
                        onClick={() => {
                          setVisibily(!visibility)
                        }}
                      />
                    )
                  ) : null}
                </div>
              </div>
              <div className='w-full'>
                <Label>Website URL</Label>
                <div className='relative flex items-center'>
                  <Input
                    readOnly
                    value={connection.website}
                    className='mt-2 focus-visible:ring-transparent'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DeleteConnection
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        connection={connection}
      />
    </div>
  )
}
