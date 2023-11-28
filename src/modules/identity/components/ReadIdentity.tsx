import {
  ActionFunctionArgs,
  LoaderFunction,
  NavLink,
  redirect,
  useLoaderData,
  useSubmit,
} from 'react-router-dom'
import { getIdentity, saveAsDefaultIdentity } from '../storage/storage'
import { Identity } from '../helpers/create-identity'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  cn,
  formatDate,
  formatPhoneNumber,
  getFirstLetterCapitalized,
  getRelationColor,
} from '@/modules/shared/lib/utils'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Edit, Trash2 } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/components/ui/use-toast'
import {
  DefaultIdentitySchema,
  defaultIdentitySchema,
} from '../helpers/schemas'
import { useEffect, useState } from 'react'
import { DeleteIdentity } from './DeleteIdentity'

export const identityLoader: LoaderFunction = ({ params }) => {
  const identity = getIdentity(params.identityId!)

  if (!identity) {
    return redirect('/identity')
  }

  return identity
}

export async function identityAction({ request }: ActionFunctionArgs) {
  const json = await request.json()
  const identityId = json.id
  return redirect(`/identity/${identityId}`)
}

export const ReadIdentity = () => {
  const identity = useLoaderData() as Identity
  const onEditSubmit = useSubmit()
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)

  function openDeleteModal() {
    setDeleteModalOpen(true)
  }

  const form = useForm<DefaultIdentitySchema>({
    resolver: zodResolver(defaultIdentitySchema),
    mode: 'onChange',
  })

  useEffect(() => {
    form.setValue('default_identity', identity.default_identity)
  }, [identity])

  function onSubmit(value: DefaultIdentitySchema) {
    saveAsDefaultIdentity(value, identity.id, {
      onSet: (identityId) => {
        toast({
          title: 'Set successfully! 🥳',
          description:
            'This identity was set as default for filling contact details.',
        })
        onEditSubmit(
          { identityId },
          {
            method: 'post',
            action: `/identity/${identityId}`,
            encType: 'application/json',
          }
        )
      },
      onUnset: (identityId) => {
        toast({
          title: 'Unset!',
          description: 'This identity is no longer set as default.',
        })
        onEditSubmit(
          { identityId },
          {
            method: 'post',
            encType: 'application/json',
          }
        )
      },
    })
  }

  return (
    <div className='bg-background h-[calc(100dvh-53px)] md:h-screen overflow-y-auto absolute inset-0 md:relative'>
      <div className='py-2 px-4 md:hidden flex justify-between items-center border-b'>
        <div>
          <NavLink
            to='/identity'
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
            to={`/identity/${identity.id}/edit`}
            className={buttonVariants({ size: 'icon', variant: 'outline' })}
          >
            <Edit className='h-5' />
          </NavLink>
          <Button variant='outline' size='icon' onClick={openDeleteModal}>
            <Trash2 className='h-5 text-customred' />
          </Button>
        </div>
      </div>

      <div className='py-4 px-4 md:px-12 flex flex-col justify-between max-h-[calc(100%-57px)] md:max-h-[100dvh] h-full'>
        <div className='flex flex-col gap-2'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-6'>
              <Avatar
                className={cn(
                  getRelationColor(identity.relation!),
                  'h-14 md:h-20 w-14 md:w-20 border-4 md:drop-shadow-xl bg-background'
                )}
              >
                <AvatarImage
                  src={identity.avatar}
                  alt={`${identity.firstname} avatar`}
                />
                <AvatarFallback className='text-3xl font-medium bg-background'>
                  {getFirstLetterCapitalized(identity.firstname) +
                    getFirstLetterCapitalized(identity.lastname)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className='text-2xl font-medium'>
                  {identity.firstname + ' ' + identity.lastname}
                </h1>
              </div>
            </div>
            <div className='md:flex gap-2 items-center hidden'>
              <NavLink
                to={`/identity/${identity.id}/edit`}
                className={buttonVariants({ size: 'icon', variant: 'outline' })}
              >
                <Edit className='h-5' />
              </NavLink>
              <Button variant='outline' size='icon' onClick={openDeleteModal}>
                <Trash2 className='h-5 text-customred' />
              </Button>
            </div>
          </div>

          <div className='flex flex-col gap-2 md:mt-6 lg:mt-12 mx-auto max-w-xl w-full '>
            <div className='w-full'>
              <Label>Phone number</Label>
              <span className='flex items-center mt-2 px-3 border border-input text-muted-foreground h-10 rounded-sm align-middle'>
                {identity.phone ? formatPhoneNumber(identity.phone) : null}
              </span>
            </div>
            <div className='w-full'>
              <Label>Mail</Label>
              <span className='flex items-center mt-2 px-3 border border-input text-muted-foreground h-10 rounded-sm align-middle'>
                {identity.mail}
              </span>
            </div>

            <div className='w-full'>
              <Label>Birth date</Label>
              <span className='flex items-center mt-2 px-3 border border-input text-muted-foreground h-10 rounded-sm align-middle'>
                {identity.date ? formatDate(identity.date) : null}
              </span>
            </div>

            <div className='flex flex-col lg:flex-row gap-2'>
              <div className='w-full'>
                <Label>Genre</Label>
                <span className='flex items-center mt-2 px-3 border border-input text-muted-foreground h-10 rounded-sm align-middle'>
                  {identity.genre}
                </span>
              </div>

              <div className='w-full'>
                <Label>Relation</Label>
                <span className='flex items-center mt-2 px-3 border border-input text-muted-foreground h-10 rounded-sm align-middle'>
                  {identity.relation}
                </span>
              </div>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='max-w-lg mx-auto w-full py-4 lg:py-0'
          >
            <FormField
              control={form.control}
              name='default_identity'
              render={({ field }) => (
                <FormItem className='flex items-center justify-between gap-2 rounded-lg border p-3 shadow-sm'>
                  <div className='space-y-0.5'>
                    <FormLabel>Default Identity</FormLabel>
                    <FormDescription>
                      Set this identity as the default for filling in contact
                      details
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      type='submit'
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>

      <DeleteIdentity
        isOpen={isDeleteModalOpen}
        setIsOpen={setDeleteModalOpen}
        identity={identity}
      />
    </div>
  )
}
