import { useForm } from 'react-hook-form'
import { ConnectionSchema, connectionSchema } from '../helpers/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  ActionFunctionArgs,
  NavLink,
  redirect,
  useSubmit,
} from 'react-router-dom'
import { ArrowLeft, Cog, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { saveConnection } from '../storage/storage'
import { toast } from '@/components/ui/use-toast'
import { PasswordGenerationModal } from './PasswordGenerationModal'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export async function createConnectionAction({ request }: ActionFunctionArgs) {
  const json = await request.json()
  const connectionId = json.id as { id: string }

  return redirect(`/connection/${connectionId}`)
}

export const CreateConnection = () => {
  const onCreateSubmit = useSubmit()
  const [visibility, setVisibily] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const form = useForm<ConnectionSchema>({
    resolver: zodResolver(connectionSchema),
    defaultValues: {
      connection_name: '',
      website: '',
      username: '',
      password: '',
    },
  })

  function onSubmit(values: ConnectionSchema) {
    saveConnection(values, {
      onSuccess(id) {
        toast({
          title: 'The connection has been successfully created! 🥳',
          description: 'Check it out.',
        })

        onCreateSubmit(
          {
            id,
          },
          {
            method: 'post',
            action: '/connection/new',
            encType: 'application/json',
          }
        )
      },
      onError() {
        toast({
          title: 'Oops! Something went wrong 🫠',
          description: 'Please try again.',
        })
      },
    })
  }

  function setGeneratedPassword(pwd: string) {
    setOpenModal(false)
    setVisibily(true)
    return form.setValue('password', pwd)
  }

  return (
    <div className='w-full bg-white overflow-y-auto absolute inset-0 md:relative h-[calc(100dvh-53px)] md:h-full'>
      <div className='flex flex-col gap-6 max-w-md w-full px-4 py-4 md:py-8 mx-auto'>
        <div className='flex items-center gap-2 md:gap-6'>
          <NavLink
            to='/connection'
            className={buttonVariants({
              size: 'sm',
              variant: 'outline',
            })}
          >
            <ArrowLeft size={20} strokeWidth={2.5} />
          </NavLink>
          <h1 className='text-2xl md:text-3xl font-bold'>
            Create a new connection
          </h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
            <FormField
              control={form.control}
              name='connection_name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Connection name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Stack Overflow' />
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
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='https://stackoverflow.com/'
                    />
                  </FormControl>
                  <FormDescription>
                    No URL? Try this one:&nbsp; <br className='md:hidden' />
                    <i>https://stackoverflow.com/</i>
                  </FormDescription>
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
                    <Input
                      {...field}
                      value={field.value}
                      placeholder='john.doe@mail.io'
                    />
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
                        placeholder='1234321'
                        type={visibility ? 'text' : 'password'}
                      />

                      {field.value !== '' ? (
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

            <div className='pt-4'>
              <Button type='submit'>Save identity</Button>
            </div>
          </form>
        </Form>
      </div>

      <PasswordGenerationModal
        open={openModal}
        setOpen={setOpenModal}
        setGeneratedPassword={setGeneratedPassword}
      />
    </div>
  )
}
