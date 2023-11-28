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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowLeft } from 'lucide-react'

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
    <div className='h-[calc(100dvh-53px)] md:h-full w-full overflow-y-auto absolute inset-0 md:relative bg-background'>
      <div className='h-full w-full p-4 md:px-8'>
        <div className='flex items-center gap-2 md:gap-4'>
          <NavLink
            to='/wallet'
            className={buttonVariants({
              size: 'sm',
              variant: 'outline',
            })}
          >
            <ArrowLeft size={20} strokeWidth={2.5} />
          </NavLink>
          <h1 className='text-lg sm:text-2xl md:text-3xl font-bold [text-wrap:balance]'>
            Create a new credit card
          </h1>
        </div>

        <Form {...form}>
          <form
            className='space-y-4 max-w-lg mx-auto mt-6'
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

            <div className='flex flex-col md:flex-row gap-2 md:gap-4'>
              <div className='w-full'>
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
              </div>

              <div className='w-full'>
                <FormField
                  control={form.control}
                  name='card_type'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card type</FormLabel>
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
                          <SelectItem value='Visa'>Visa</SelectItem>
                          <SelectItem value='Mastercard'>Mastercard</SelectItem>
                          <SelectItem value='American Express'>
                            American Express
                          </SelectItem>
                          <SelectItem value='Other'>Other</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className='flex flex-col md:flex-row gap-2 md:gap-4'>
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

            <div className='py-4'>
              <Button type='submit'>Save credit card</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
