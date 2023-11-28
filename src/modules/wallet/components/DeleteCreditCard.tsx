import { Dispatch, SetStateAction } from 'react'
import { CreditCard } from '../helpers/create-credit-card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { deleteCreditCard } from '../storage/storage'
import { toast } from '@/components/ui/use-toast'
import { genericErrorToast } from '@/modules/shared/lib/utils'
import { useSubmit } from 'react-router-dom'

type DeleteCreditCardProps = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  creditCard: CreditCard
}

export const DeleteCreditCard = ({
  isOpen,
  setIsOpen,
  creditCard,
}: DeleteCreditCardProps) => {
  const onDeleteSubmit = useSubmit()

  function handleDelete() {
    deleteCreditCard(creditCard.id, {
      onSuccess() {
        toast({
          title: 'The card has been permantely deleted! 🥳',
          description: 'Browse your list or create a new credit card.',
        })
        setIsOpen(false)

        onDeleteSubmit({
          method: 'get',
        })
      },
      onError() {
        genericErrorToast()
      },
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} modal>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <span className='text-customred text-xl'>Delete credit card</span>
            <Trash2 size={20} strokeWidth={2.3} className='text-customred' />
          </DialogTitle>
          <DialogDescription className='py-3 text-base'>
            This action cannot be undone. Are you sure you want to permanently
            delete&nbsp;
            <span className='text-black dark:text-white font-medium'>
              {creditCard.bank_name}
            </span>
            &nbsp;card from your list?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className='gap-2'>
          <DialogClose asChild>
            <Button type='button' variant='secondary'>
              Cancel
            </Button>
          </DialogClose>

          <Button onClick={handleDelete}>Delete credit card</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
