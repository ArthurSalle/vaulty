import {
  ActionFunctionArgs,
  Link,
  redirect,
  useLoaderData,
  useSubmit,
} from 'react-router-dom'
import { Identity } from '../helpers/create-identity'
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
import {
  capitalizeFirstLetter,
  cn,
  formatDate,
  getFirstLetterCapitalized,
  getRelationColor,
} from '@/modules/shared/lib/utils'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button, buttonVariants } from '@/components/ui/button'
import { CalendarIcon, X } from 'lucide-react'
import { DayPicker } from 'react-day-picker'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useForm } from 'react-hook-form'
import { identitySchema } from '../helpers/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { saveEditedIdentity } from '../storage/storage'
import { toast } from '@/components/ui/use-toast'

export async function action({ request }: ActionFunctionArgs) {
  const data = (await request.json()) as { id: string }
  return redirect(`/identity/${data.id}`)
}
export const EditIdentity = () => {
  const identity = useLoaderData() as Identity
  const submit = useSubmit()

  const form = useForm<Identity>({
    resolver: zodResolver(identitySchema),
    defaultValues: {
      firstname: identity.firstname,
      lastname: identity.lastname,
      phone: identity.phone,
      mail: identity.mail,
      avatar: identity.avatar,
      date: identity.date,
      genre: identity.genre,
      relation: identity.relation,
    },
  })

  function onSubmit(value: Identity) {
    const id = identity.id
    const formattedValue = { ...value, id }
    saveEditedIdentity(formattedValue, {
      onSuccess(id) {
        toast({
          title: 'The identity has been successfully updated! 🥳',
          description: 'Check it out.',
          duration: 2500,
        })

        submit(
          { id },
          {
            method: 'post',
            encType: 'application/json',
          }
        )
      },
      onError(errorDetail) {
        if (errorDetail === 'no modifications') {
          toast({
            title: 'No changes made! 🤔',
            description: 'Feel free to change the identity details.',
            duration: 2500,
          })
        } else {
          toast({
            title: 'Something went wrong... 🫠',
            description: 'Please try again.',
            duration: 2500,
          })
        }
      },
    })
  }

  return (
    <div className='max-h-screen h-full overflow-y-auto py-6 px-12 flex flex-col'>
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
              {/* {form.getValues('firstname')} */}
            </h1>
          </div>
        </div>
        <div>
          <Link
            to={`/identity/${identity.id}`}
            className={buttonVariants({ size: 'icon', variant: 'outline' })}
          >
            <X />
          </Link>
        </div>
      </div>

      <div className='overflow-y-auto w-full flex items-center justify-center h-full'>
        <div className='flex flex-col gap-6 max-w-md w-full '>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-2 mb-4'
            >
              <div className='flex gap-6'>
                <FormField
                  control={form.control}
                  name='firstname'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>Firstname</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='John'
                          {...field}
                          value={capitalizeFirstLetter(field.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='lastname'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>Lastname</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Doe'
                          {...field}
                          value={capitalizeFirstLetter(field.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder='+33' {...field} value={field.value} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='mail'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Adress</FormLabel>
                    <FormControl>
                      <Input placeholder='john.doe@mail.io' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='avatar'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Avatar URL</FormLabel>
                    <FormControl>
                      <Input placeholder='https://yourphoto.png' {...field} />
                    </FormControl>
                    <FormDescription>
                      No URL? Try this one:&nbsp;
                      <i>
                        https://api.dicebear.com/7.x/notionists/svg?seed=Harley
                      </i>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='date'
                render={({ field }) => (
                  <FormItem className='flex flex-col justify-between'>
                    <FormLabel className='mt-1.5 mb-0.5'>
                      Date of birth
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              formatDate(field.value)
                            ) : (
                              <span>Choose a date</span>
                            )}
                            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0' align='start'>
                        <DayPicker
                          mode='single'
                          selected={field.value!}
                          onSelect={field.onChange}
                          captionLayout='dropdown-buttons'
                          fromYear={1900}
                          toYear={new Date().getFullYear()}
                          disabled={{ after: new Date() }}
                          weekStartsOn={1}
                          modifiersStyles={{
                            selected: { backgroundColor: 'black' },
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='flex gap-6'>
                <FormField
                  control={form.control}
                  name='genre'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>Genre</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className='text-muted-foreground'>
                            <SelectValue placeholder='Select the genre' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='Man'>Man</SelectItem>
                          <SelectItem value='Woman'>Woman</SelectItem>
                          <SelectItem value='Other'>Other</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='relation'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>Relation</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className='text-muted-foreground'>
                            <SelectValue placeholder='Select the relation tag' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='Myself'>
                            <div className='flex items-center gap-2'>
                              <div className='h-4 w-4 bg-amber-400 rounded-full' />
                              <span>Myself</span>
                            </div>
                          </SelectItem>
                          <SelectItem value='Family'>
                            <div className='flex items-center gap-2'>
                              <div className='h-4 w-4 bg-rose-400 rounded-full' />
                              <span>Family</span>
                            </div>
                          </SelectItem>
                          <SelectItem value='Friends'>
                            <div className='flex items-center gap-2'>
                              <div className='h-4 w-4 bg-indigo-400 rounded-full' />
                              <span>Friends</span>
                            </div>
                          </SelectItem>
                          <SelectItem value='Work mates'>
                            <div className='flex items-center gap-2'>
                              <div className='h-4 w-4 bg-teal-400 rounded-full' />
                              <span>Work mates</span>
                            </div>
                          </SelectItem>
                          <SelectItem value='Other'>
                            <div className='flex items-center gap-2'>
                              <div className='h-4 w-4 bg-neutral-400 rounded-full' />
                              <span>Other</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='pt-4'>
                <Button type='submit'>Save changes</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
