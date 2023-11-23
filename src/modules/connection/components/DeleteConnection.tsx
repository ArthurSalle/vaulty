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
import { useSubmit } from 'react-router-dom'
import { genericErrorToast } from '@/modules/shared/lib/utils'

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
  const onDeleteSubmit = useSubmit()

  function handleClick() {
    deleteConnection(connection.id, {
      onSuccess() {
        toast({
          title: 'The connection has been permantely deleted! 🥳',
          description: 'Browse your list or create a new connection.',
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
