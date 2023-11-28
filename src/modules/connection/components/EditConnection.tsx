import { useForm } from 'react-hook-form'
import { Connection } from '../helpers/create-connection'
import { zodResolver } from '@hookform/resolvers/zod'
import { connectionSchema } from '../helpers/schemas'
import {
  ActionFunctionArgs,
  Link,
  redirect,
  useLoaderData,
  useSubmit,
} from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  capitalizeFirstLetter,
  genericErrorToast,
  getFirstLetterCapitalized,
} from '@/modules/shared/lib/utils'
import { Cog, Eye, EyeOff, X } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { saveEditedConnection } from '../storage/storage'
import { toast } from '@/components/ui/use-toast'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { PasswordGenerationModal } from './PasswordGenerationModal'

export async function editConnectionAction({ request }: ActionFunctionArgs) {
  const json = await request.json()
  const connectionId = json.id as { id: string }
  return redirect(`/connection/${connectionId}`)
}

export const EditConnection = () => {
  const connection = useLoaderData() as Connection
  const [visibility, setVisibily] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const onEditSubmit = useSubmit()

  const form = useForm<Connection>({
    resolver: zodResolver(connectionSchema),
    defaultValues: {
      connection_name: connection.connection_name,
      username: connection.username,
      password: connection.password,
      website: connection.website,
    },
  })

  function onSubmit(values: Connection) {
    const id = connection.id
    const formattedValue = { ...values, id }

    saveEditedConnection(formattedValue, {
      onSuccess(id) {
        toast({
          title: 'The connection has been successfully updated! 🥳',
          description: 'Check it out.',
        })

        onEditSubmit(
          { id },
          {
            method: 'post',
            action: `/connection/${id}/edit`,
            encType: 'application/json',
          }
        )
      },
      onError() {
        genericErrorToast()
      },
    })
  }

  function setGeneratedPassword(pwd: string) {
    setOpenModal(false)
    setVisibily(true)
    return form.setValue('password', pwd)
  }

  return (
    <div className='bg-background h-[calc(100dvh-53px)] md:max-h-screen md:h-full absolute inset-0 md:relative overflow-y-auto p-4 md:px-12 flex flex-col gap-2'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-6'>
          <Avatar className='h-14 md:h-20 w-14 md:w-20 border-4 md:drop-shadow-xl bg-background'>
            <AvatarImage
              src={
                connection.website
                  ? `https://www.google.com/s2/favicons?domain=${connection.website}&sz=96`
                  : ''
              }
              alt={`${connection.connection_name} logo`}
            />
            <AvatarFallback className='text-3xl font-medium bg-background'>
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
        <div>
          <Link
            to={`/connection/${connection.id}`}
            className={buttonVariants({ size: 'icon', variant: 'outline' })}
          >
            <X />
          </Link>
        </div>
      </div>

      <div className='flex flex-col gap-2 lg:gap-4 md:mt-6 lg:mt-12 mx-auto max-w-xl w-full'>
        <div className='flex flex-col gap-2'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
              <FormField
                control={form.control}
                name='connection_name'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Connection name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value
                          .split(' ')
                          .map((el) => {
                            return capitalizeFirstLetter(el)
                          })
                          .join(' ')}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username/Email</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className='relative flex items-center gap-2'>
                        <Input
                          {...field}
                          value={field.value}
                          type={visibility ? 'text' : 'password'}
                        />
                        {connection.password !== '' ? (
                          visibility ? (
                            <EyeOff
                              className='absolute right-16 cursor-pointer text-muted-foreground'
                              onClick={() => {
                                setVisibily(!visibility)
                              }}
                            />
                          ) : (
                            <Eye
                              className='absolute right-16 cursor-pointer text-muted-foreground'
                              onClick={() => {
                                setVisibily(!visibility)
                              }}
                            />
                          )
                        ) : null}

                        <TooltipProvider delayDuration={100}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                type='button'
                                variant='outline'
                                size='icon'
                                onClick={() => setOpenModal(true)}
                              >
                                <Cog className='text-muted-foreground' />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side='bottom'>
                              <p>Generate password</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='website'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website URL</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className='pt-4'>
                <Button type='submit'>Save changes</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>

      <PasswordGenerationModal
        open={openModal}
        setOpen={setOpenModal}
        setGeneratedPassword={setGeneratedPassword}
      />
    </div>
  )
}
