import { useForm } from 'react-hook-form'
import { CreditCardSchema, creditCardSchema } from '../helpers/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ActionFunctionArgs,
  NavLink,
  redirect,
  useSubmit,
} from 'react-router-dom'
import { Button, buttonVariants } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PatternFormat } from 'react-number-format'
import { saveCreditcard } from '../storage/storage'
import { toast } from '@/components/ui/use-toast'
import { genericErrorToast } from '@/modules/shared/lib/utils'

export async function createCreditCardAction({ request }: ActionFunctionArgs) {
  const json = await request.json()
  const creditCardId = json.id as { id: string }
  return redirect(`/wallet/${creditCardId}`)
}

export const CreateCreditCard = () => {
  const onCreateSubmit = useSubmit()

  const form = useForm<CreditCardSchema>({
    resolver: zodResolver(creditCardSchema),
    defaultValues: {
      bank_name: '',
      cardholder_name: '',
      card_number: '',
      card_cvc: '',
      card_expiration_date: '',
    },
  })

  function onSubmit(values: CreditCardSchema) {
    saveCreditcard(values, {
      onSuccess(id) {
        toast({
          title: 'Credit card successfully saved! 🤑',
          description: 'Check it out.',
        })
        console.log(id)

        onCreateSubmit(
          {
            id,
          },
          {
            method: 'post',
            action: '/wallet/new',
            encType: 'application/json',
          }
        )
      },
      onError() {
        genericErrorToast()
      },
    })
  }

  return (
    <div className='w-full bg-white overflow-y-auto absolute inset-0 md:relative h-[calc(100dvh-53px)] md:h-full'>
      <div className='flex flex-col gap-6 max-w-md w-full px-4 py-4 md:py-8 mx-auto'>
        <div className='flex items-center gap-2 md:gap-6'>
          <NavLink
            to='/wallet'
            className={buttonVariants({
              size: 'sm',
              variant: 'outline',
            })}
          >
            <ArrowLeft size={20} strokeWidth={2.5} />
          </NavLink>
          <h1 className='text-2xl md:text-3xl font-bold'>
            Create a new identity
          </h1>
        </div>

        <Form {...form}>
          <form
            className='space-y-2 mb-4'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name='bank_name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank name</FormLabel>
                  <FormControl>
                    <Input placeholder='American Express' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='cardholder_name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cardholder name</FormLabel>
                  <FormControl>
                    <Input placeholder='John Doe' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='card_number'
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>Card number</FormLabel>
                  <FormControl>
                    <PatternFormat
                      onChange={onChange}
                      value={value}
                      format='#### #### #### ####'
                      placeholder='1234 1234 1234 1234'
                      customInput={Input}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex gap-2'>
              <FormField
                control={form.control}
                name='card_expiration_date'
                render={({ field: { value, onChange } }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Expiration Date</FormLabel>
                    <FormControl>
                      <PatternFormat
                        onChange={onChange}
                        value={value}
                        format='##/##'
                        customInput={Input}
                        placeholder='01/24'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='card_cvc'
                render={({ field: { value, onChange } }) => (
                  <FormItem className='w-full'>
                    <FormLabel>CVC</FormLabel>
                    <FormControl>
                      <PatternFormat
                        onChange={onChange}
                        value={value}
                        format='###'
                        placeholder='123'
                        customInput={Input}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='pt-4'>
              <Button type='submit'>Save credit card</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
