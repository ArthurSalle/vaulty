import { Dispatch, SetStateAction } from 'react'
import { Connection } from '../helpers/create-connection'
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
import { deleteConnection } from '../storage/storage'
import { toast } from '@/components/ui/use-toast'
import { useRevalidator } from 'react-router-dom'

type PropsType = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  connection: Connection
}

export const DeleteConnection = ({
  isOpen,
  setIsOpen,
  connection,
}: PropsType) => {
  const revalidator = useRevalidator()

  function handleClick() {
    deleteConnection(connection.id, {
      onSuccess() {
        toast({
          title: 'The connection has been permantely deleted! 🥳',
          description: 'Browse your list or create a new connection.',
          duration: 2500,
        })
        setIsOpen(false)
        revalidator.revalidate()
      },
      onError() {
        toast({
          title: 'Something went wrong... 🫠',
          description: 'Please try again.',
          duration: 2500,
        })
      },
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} modal>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <span className='text-customred text-xl'>Delete connection</span>
            <Trash2 size={20} strokeWidth={2.3} className='text-customred' />
          </DialogTitle>
          <DialogDescription className='py-3 text-base'>
            This action cannot be undone. Are you sure you want to permanently
            delete&nbsp;
            <span className='text-black font-medium'>
              {connection.connection_name}
            </span>
            &nbsp;from your list?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className='gap-1'>
          <DialogClose asChild>
            <Button type='button' variant='secondary'>
              Cancel
            </Button>
          </DialogClose>

          <Button onClick={handleClick}>Delete Connection</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}