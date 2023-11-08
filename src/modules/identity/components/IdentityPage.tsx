import {
  ActionFunctionArgs,
  Link,
  LoaderFunction,
  redirect,
  useLoaderData,
  useParams,
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
import { Edit, Trash2 } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
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
import { useEffect } from 'react'

export const IdentityLoader: LoaderFunction = ({ params }) => {
  const identity = getIdentity(params.identityId!)

  if (!identity) {
    return redirect('/identity')
  }

  return identity
}

export async function action({ request }: ActionFunctionArgs) {
  const data = (await request.json()) as { identityId: string }
  return redirect(`/identity/${data.identityId}`)
}

export const IdentityPage = () => {
  const identity = useLoaderData() as Identity
  const { identityId } = useParams()
  const submit = useSubmit()

  const form = useForm<DefaultIdentitySchema>({
    resolver: zodResolver(defaultIdentitySchema),
    mode: 'onChange',
  })

  useEffect(() => {
    form.setValue('default_identity', identity.default_identity)
  }, [identity.default_identity])

  function onSubmit(value: DefaultIdentitySchema) {
    saveAsDefaultIdentity(value, identityId!, {
      onSet: (identityId) => {
        toast({
          title: 'Set successfully! 🥳',
          description:
            'This identity was set as default for filling contact details.',
          duration: 2500,
          // className: cn(
          //   'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
          // ),
        })
        submit(
          { identityId },
          {
            method: 'post',
            // action: `/identity/${identityId}`,
            encType: 'application/json',
          }
        )
      },
      onUnset: (identityId) => {
        toast({
          title: 'Unset!',
          description: 'This identity is no longer set as default.',
          duration: 2500,
          // className: cn(
          //   'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
          // ),
        })
        submit(
          { identityId },
          {
            method: 'post',
            action: `/identity/${identityId}`,
            encType: 'application/json',
          }
        )
      },
    })
  }

  return (
    <div className='max-h-screen h-full overflow-y-auto py-6 px-12 relative'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-6'>
          <Avatar
            className={cn(
              getRelationColor(identity.relation!),
              'h-20 w-20 border-4 drop-shadow-xl'
            )}
          >
            <AvatarImage
              src={identity.avatar}
              alt={`${identity.firstname} avatar`}
            />
            <AvatarFallback>
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

        <div className='flex gap-2 items-center'>
          <Link
            to={`/identity/${identity.id}/edit`}
            className={buttonVariants({ size: 'icon', variant: 'outline' })}
          >
            <Edit className='h-5' />
          </Link>

          <Link
            to=''
            className={buttonVariants({ size: 'icon', variant: 'outline' })}
          >
            <Trash2 className='h-5 text-customred' />
          </Link>
        </div>
      </div>

      <div className='flex flex-col gap-6 mt-12 mx-auto max-w-xl w-full '>
        <div className='flex gap-4'>
          <div className='w-full'>
            <Label>Phone number</Label>
            <span className='flex items-center mt-2 px-3 border border-input text-muted-foreground h-10 rounded-sm align-middle'>
              {identity.phone && formatPhoneNumber(identity.phone)}
            </span>
          </div>
          <div className='w-full'>
            <Label>Mail</Label>
            <span className='flex items-center mt-2 px-3 border border-input text-muted-foreground h-10 rounded-sm align-middle'>
              {identity.mail && identity.mail}
            </span>
          </div>
        </div>

        <div className='flex gap-4'>
          <div className='w-full'>
            <Label>Birth date</Label>
            <span className='flex items-center mt-2 px-3 border border-input text-muted-foreground h-10 rounded-sm align-middle'>
              {identity.date && formatDate(identity.date)}
            </span>
          </div>
          <div className='w-full'>
            <Label>Genre</Label>
            <span className='flex items-center mt-2 px-3 border border-input text-muted-foreground h-10 rounded-sm align-middle'>
              {identity.genre && identity.genre}
            </span>
          </div>
          <div className='w-full'>
            <Label>Relation</Label>
            <span className='flex items-center mt-2 px-3 border border-input text-muted-foreground h-10 rounded-sm align-middle'>
              {identity.relation && identity.relation}
            </span>
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='max-w-xl w-full mt-10 absolute bottom-8'
          >
            <FormField
              control={form.control}
              name='default_identity'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
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
    </div>
  )
}
