import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../components/ui/form'
import { Input } from '../../../components/ui/input'
import { Button } from '../../../components/ui/button'
import {
  capitalizeFirstLetter,
  cn,
  formatPhoneNumber,
} from '@/modules/shared/lib/utils'
import { IdentitySchema, avatarUrl, identitySchema } from '../helpers/schemas'
import { saveIdentity } from '../storage/storage'
import { toast } from '@/components/ui/use-toast'
import { ActionFunctionArgs, redirect, useSubmit } from 'react-router-dom'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { format } from 'date-fns'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export async function action({ request }: ActionFunctionArgs) {
  const data = (await request.json()) as { id: string }
  return redirect(`/identity/${data.id}`)
}

export const CreateIdentity = () => {
  const form = useForm<IdentitySchema>({
    resolver: zodResolver(identitySchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      phone: '',
      mail: '',
      avatar: '',
    },
  })

  const submit = useSubmit()

  function onSubmit(values: IdentitySchema) {
    saveIdentity(values, {
      onSuccess: (id) => {
        toast({
          title: 'The identity has been successfully created! 🥳',
          description: 'Check it out.',
        })

        submit(
          { id },
          {
            method: 'post',
            action: '/identity/new',
            encType: 'application/json',
          }
        )
      },
      onError: () => {
        toast({
          title: 'This identity already exists! 😬',
          description: 'Please edit the existing identity.',
        })
      },
    })
  }

  return (
    <div className='max-h-screen h-full overflow-y-auto w-full flex items-center justify-center'>
      <div className='flex flex-col gap-6 max-w-md w-full '>
        <h1 className='text-3xl font-bold'>Create a new identity</h1>

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
                    <Input
                      placeholder='+33'
                      {...field}
                      value={formatPhoneNumber(field.value!)}
                    />
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
                    <Input placeholder='john.doe@mail.com' {...field} />
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
                    <i>https://github.com/ArthurSalle.png</i>
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
                  <FormLabel className='mt-1.5 mb-0.5'>Date of birth</FormLabel>
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
                            format(field.value, 'dd/MM/yyyy')
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
                        selected={field.value}
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
                        <SelectItem value='Woman'>Men</SelectItem>
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
                        <SelectItem value='Myself'>Myself</SelectItem>
                        <SelectItem value='Family'>Family</SelectItem>
                        <SelectItem value='Friends'>Friends</SelectItem>
                        <SelectItem value='Work mates'>Work mates</SelectItem>
                        <SelectItem value='Other'>Other</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='pt-4'>
              <Button type='submit'>Save identity</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
