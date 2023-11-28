import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
import { X } from 'lucide-react'
import {
  ActionFunctionArgs,
  Link,
  redirect,
  useLoaderData,
  useSubmit,
} from 'react-router-dom'
import { CreditCard } from '../helpers/create-credit-card'
import {
  capitalizeFirstLetter,
  genericErrorToast,
  getFirstLetterCapitalized,
} from '@/modules/shared/lib/utils'
import { useForm } from 'react-hook-form'
import { creditCardSchema } from '../helpers/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PatternFormat } from 'react-number-format'
import { getCreditCardLogo } from '../helpers/helpers'
import { saveEditedCreditCard } from '../storage/storage'
import { toast } from '@/components/ui/use-toast'

export async function editCreditCardAction({ request }: ActionFunctionArgs) {
  const json = await request.json()
  const creditCardId = json.id
  return redirect(`/wallet/${creditCardId}`)
}

export const EditCreditCard = () => {
  const creditCard = useLoaderData() as CreditCard
  const onEditSubmit = useSubmit()

  const form = useForm<CreditCard>({
    resolver: zodResolver(creditCardSchema),
    defaultValues: {
      bank_name: creditCard.bank_name,
      cardholder_name: creditCard.cardholder_name,
      card_number: creditCard.card_number,
      card_type: creditCard.card_type,
      card_expiration_date: creditCard.card_expiration_date,
      card_cvc: creditCard.card_cvc,
      default_card: creditCard.default_card,
    },
  })

  function onSubmit(value: CreditCard) {
    const id = creditCard.id
    const formattedValue = { ...value, id }

    saveEditedCreditCard(formattedValue, {
      onSuccess(id) {
        toast({
          title: 'The card has been successfully updated! 🥳',
          description: 'Check it out.',
        })

        onEditSubmit(
          { id },
          {
            method: 'post',
            action: `/wallet/${id}/edit`,
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
    <div className='bg-background h-[calc(100dvh-53px)] md:max-h-screen md:h-full absolute inset-0 md:relative overflow-y-auto p-4 md:px-12 flex flex-col gap-2'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-6'>
          <Avatar className='h-14 md:h-20 w-14 md:w-20 border-4 md:drop-shadow-xl bg-background'>
            <AvatarImage
              src={getCreditCardLogo(creditCard.card_type)}
              alt='card-logo'
            />
            <AvatarFallback className='text-3xl font-medium bg-background'>
              {creditCard.bank_name?.split(' ').map((el) => {
                return getFirstLetterCapitalized(el)
              })}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className='text-2xl font-medium'>
              {creditCard.bank_name?.split(' ').map((el) => {
                return capitalizeFirstLetter(el) + ' '
              })}
            </h1>
          </div>
        </div>
        <div>
          <Link
            to={`/wallet/${creditCard.id}`}
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
                name='bank_name'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Bank name</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value} />
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
                      <Input {...field} value={field.value} />
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
                            <SelectItem value='Mastercard'>
                              Mastercard
                            </SelectItem>
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
