import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { formatPhoneNumber } from '@/modules/shared/lib/utils'
import { createUser } from './helpers/create-identity'
import { useToast } from '../../components/ui/use-toast'

export const userSchema = z.object({
  firstname: z.string().min(2, {
    message: 'Firstname must be at least 2 characters.',
  }),
  lastname: z.string().min(2, {
    message: 'Lastname must be at least 2 characters.',
  }),
  phone: z
    .string()
    .min(14, {
      message: 'Phone number must be 10 characters.',
    })
    .max(14, {
      message: 'Phone number must be 10 characters.',
    })
    .optional(),
})

export const CreateIdentity = () => {
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      phone: '',
    },
  })

  const toast = useToast()

  function onSubmit(values: z.infer<typeof userSchema>) {
    createUser(values, {
      onSuccess: () => {
        toast.toast({
          title: 'The identity has been successfully created! 🥳',
          description: 'Check it in your list.',
        })
      },
      onError: () => {
        toast.toast({
          title: 'This identity already exists! 😬',
          description: 'Please edit the existing identity.',
        })
      },
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='firstname'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Firstname</FormLabel>
              <FormControl>
                <Input placeholder='John' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='lastname'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lastname</FormLabel>
              <FormControl>
                <Input placeholder='Doe' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

        <Button type='submit'>Save identity</Button>
      </form>
    </Form>
  )
}
