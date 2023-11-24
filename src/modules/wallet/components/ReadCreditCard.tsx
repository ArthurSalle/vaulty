import {
  ActionFunctionArgs,
  LoaderFunction,
  NavLink,
  redirect,
  useLoaderData,
  useSubmit,
} from 'react-router-dom'
import { getCreditCard, saveAsDefaultCreditCard } from '../storage/storage'
import { CreditCard } from '../helpers/create-credit-card'
import { Button, buttonVariants } from '@/components/ui/button'
import { ArrowLeft, Edit, Eye, EyeOff, Trash2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  capitalizeFirstLetter,
  getFirstLetterCapitalized,
} from '@/modules/shared/lib/utils'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { DeleteCreditCard } from './DeleteCreditCard'
import { PatternFormat } from 'react-number-format'
import { useForm } from 'react-hook-form'
import {
  DefaultCreditCardSchema,
  defaultCreditCardSchema,
} from '../helpers/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { toast } from '@/components/ui/use-toast'
import { getCreditCardLogo } from '../helpers/helpers'

export const readCreditCardLoader: LoaderFunction = ({ params }) => {
  const creditCard = getCreditCard(params.creditCardId!)

  if (!creditCard) {
    return redirect('/wallet/new')
  }

  return creditCard
}

export async function creditCardAction({ request }: ActionFunctionArgs) {
  const json = await request.json()
  const creditCardId = json.creditCardId
  return redirect(`/wallet/${creditCardId}`)
}

export const ReadCreditCard = () => {
  const creditCard = useLoaderData() as CreditCard
  const [visibility, setVisibility] = useState(false)
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const onEditSubmit = useSubmit()

  function openDeleteModal() {
    setDeleteModalOpen(true)
  }

  useEffect(() => {
    setVisibility(false)
  }, [creditCard])

  const form = useForm<DefaultCreditCardSchema>({
    resolver: zodResolver(defaultCreditCardSchema),
    mode: 'onChange',
  })

  useEffect(() => {
    form.setValue('default_card', creditCard.default_card)
  }, [creditCard])

  function onSubmit(value: DefaultCreditCardSchema) {
    saveAsDefaultCreditCard(value, creditCard.id, {
      onSet(creditCardId) {
        toast({
          title: 'Set successfully! 🥳',
          description:
            'This identity was set as default for filling contact details.',
        })

        onEditSubmit(
          { creditCardId },
          {
            method: 'post',
            action: `/wallet/${creditCardId}`,
            encType: 'application/json',
          }
        )
      },
      onUnset(creditCardId) {
        toast({
          title: 'Unset!',
          description: 'This identity is no longer set as default.',
        })

        onEditSubmit(
          { creditCardId },
          {
            method: 'post',
            action: `/wallet/${creditCardId}`,
            encType: 'application/json',
          }
        )
      },
    })
  }

  return (
    <div className='bg-white h-[calc(100dvh-53px)] md:h-screen overflow-y-auto absolute inset-0 md:relative'>
      <div className='py-2 px-4 md:hidden flex justify-between items-center border-b'>
        <div>
          <NavLink
            to='/wallet'
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
            to={`/wallet/${creditCard.id}/edit`}
            className={buttonVariants({ size: 'icon', variant: 'outline' })}
          >
            <Edit className='h-5' />
          </NavLink>
          <Button variant='outline' size='icon' onClick={openDeleteModal}>
            <Trash2 className='h-5 text-customred' />
          </Button>
        </div>
      </div>

      <div className='py-4 md:py-8 px-4 md:px-12 flex flex-col justify-between max-h-[calc(100%-57px)] md:max-h-[100dvh] h-full'>
        <div className='flex flex-col gap-2'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-6'>
              <Avatar className='h-14 md:h-20 w-14 md:w-20 border-4 md:drop-shadow-xl bg-white'>
                <AvatarImage
                  src={getCreditCardLogo(creditCard.card_type)}
                  alt='card-logo'
                />
                <AvatarFallback className='text-2xl font-medium bg-white'>
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
            <div className='md:flex gap-2 items-center hidden'>
              <NavLink
                to={`/wallet/${creditCard.id}/edit`}
                className={buttonVariants({ size: 'icon', variant: 'outline' })}
              >
                <Edit className='h-5' />
              </NavLink>
              <Button variant='outline' size='icon' onClick={openDeleteModal}>
                <Trash2 className='h-5 text-customred' />
              </Button>
            </div>
          </div>

          <div className='flex flex-col gap-2 lg:gap-4 md:mt-6 lg:mt-12 mx-auto max-w-xl w-full'>
            <div className='flex flex-col gap-2'>
              <div className='w-full'>
                <Label>Cardholder name</Label>
                <div className='relative flex items-center'>
                  <Input
                    readOnly
                    value={creditCard.cardholder_name}
                    className='mt-2 focus-visible:ring-transparent'
                  />
                </div>
              </div>

              <div className='w-full'>
                <Label>Card number</Label>
                <div className='relative flex items-center'>
                  <PatternFormat
                    format='#### •••• •••• ••••'
                    value={creditCard.card_number}
                    customInput={Input}
                    className='mt-2 focus-visible:ring-transparent'
                    readOnly
                  />
                </div>
              </div>

              <div className='flex flex-col md:flex-row gap-2 md:gap-4'>
                <div className='w-full'>
                  <Label>Expiration date</Label>
                  <div className='relative flex items-center'>
                    <Input
                      readOnly
                      value={creditCard.card_expiration_date}
                      className='mt-2 focus-visible:ring-transparent'
                    />
                  </div>
                </div>

                <div className='w-full'>
                  <Label>CVC</Label>
                  <div className='relative flex items-center'>
                    <Input
                      readOnly
                      value={creditCard.card_cvc}
                      type={visibility ? 'text' : 'password'}
                      className='mt-2 focus-visible:ring-transparent'
                    />
                    {creditCard.card_cvc !== '' ? (
                      visibility ? (
                        <EyeOff
                          className='absolute right-4 mt-2 cursor-pointer text-muted-foreground'
                          onClick={() => {
                            setVisibility(!visibility)
                          }}
                        />
                      ) : (
                        <Eye
                          className='absolute right-4 mt-2 cursor-pointer text-muted-foreground'
                          onClick={() => {
                            setVisibility(!visibility)
                          }}
                        />
                      )
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='max-w-lg w-full mx-auto py-4 lg:py-0'
          >
            <FormField
              control={form.control}
              name='default_card'
              render={({ field }) => (
                <FormItem className='flex items-center justify-between gap-2  rounded-lg border p-3 shadow-sm'>
                  <div className='space-y-0.5'>
                    <FormLabel>Default Credit Card</FormLabel>
                    <FormDescription>
                      Set this credit card as the default for filling in payment
                      details form.
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

      <DeleteCreditCard
        isOpen={isDeleteModalOpen}
        setIsOpen={setDeleteModalOpen}
        creditCard={creditCard}
      />
    </div>
  )
}
