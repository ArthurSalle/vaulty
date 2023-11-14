import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Cog, RefreshCcw } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

type PropsType = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  setGeneratedPassword: (pwd: string) => void
}

export const PasswordGenerationModal = ({
  open,
  setOpen,
  setGeneratedPassword,
}: PropsType) => {
  const [password, setPassword] = useState('')
  const [numbers, setNumbers] = useState(true)
  const [symbols, setSymbols] = useState(true)
  const [onlyNumbers, setOnlyNumbers] = useState(false)
  const [length, setLength] = useState(12)

  function handleCheckboxChange(
    stateSetter: Dispatch<SetStateAction<boolean>>,
    value: boolean
  ) {
    stateSetter(value)
    if (value) {
      setOnlyNumbers(false)
    }
  }

  function getRandomChar(charSet: string) {
    const randomIndex = Math.floor(Math.random() * charSet.length)
    return charSet[randomIndex]
  }

  function generatePwd() {
    const numbersList = '0123456789'
    const symbolsList = '!-_@#$%^&*'
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

    if (onlyNumbers) {
      setNumbers(false)
      setSymbols(false)
      chars = numbersList
    } else {
      if (numbers) {
        chars += numbersList
      }
      if (symbols) {
        chars += symbolsList
      }
    }

    let generatedPwd = ''

    if (numbers) {
      generatedPwd += getRandomChar(numbersList)
    }

    if (!onlyNumbers && chars.length > 0) {
      generatedPwd += getRandomChar(chars)
    }

    if (symbols) {
      generatedPwd += getRandomChar(symbolsList)
    }

    for (let i = generatedPwd.length; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length)
      generatedPwd += chars[randomIndex]
    }

    generatedPwd = generatedPwd
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('')

    return generatedPwd
  }

  function refreshPwd() {
    const newPassword = generatePwd()
    setPassword(newPassword)
  }

  useEffect(() => {
    setPassword(generatePwd())
  }, [numbers, symbols, onlyNumbers, length])

  return (
    <Dialog open={open} onOpenChange={setOpen} modal>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <span className=' text-xl'>Generate a custom password</span>
            <Cog size={20} strokeWidth={2.3} className='' />
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-2'>
          <Label>Password</Label>
          <div className='flex items-center gap-2'>
            <Input value={password} readOnly />
            <Button onClick={refreshPwd} variant='outline' size='icon'>
              <RefreshCcw className='text-muted-foreground' />
            </Button>
          </div>
        </div>

        <div className='space-y-2'>
          <Label>Options</Label>

          <div className='flex gap-4'>
            <div className='flex items-center space-x-2'>
              <Checkbox
                id='numbers'
                checked={numbers}
                onCheckedChange={() =>
                  handleCheckboxChange(setNumbers, !numbers)
                }
              />
              <label
                htmlFor='numbers'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                Add numbers
              </label>
            </div>

            <div className='flex items-center space-x-2'>
              <Checkbox
                id='symbols'
                checked={symbols}
                onCheckedChange={() =>
                  handleCheckboxChange(setSymbols, !symbols)
                }
              />
              <label
                htmlFor='symbols'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                Add symbols
              </label>
            </div>

            <div className='flex items-center space-x-2'>
              <Checkbox
                id='onlynumbers'
                checked={onlyNumbers}
                onCheckedChange={() => setOnlyNumbers(!onlyNumbers)}
              />
              <label
                htmlFor='onlynumbers'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                Only numbers
              </label>
            </div>
          </div>
        </div>

        <div className='space-y-2'>
          <Label>Length {length}</Label>

          <div className='flex gap-2'>
            <span>4</span>
            <Slider
              defaultValue={[length]}
              onValueChange={(value) => setLength(value[0])}
              max={20}
              min={4}
            />
            <span>20</span>
          </div>
        </div>

        <DialogFooter className='gap-1'>
          <DialogClose asChild>
            <Button type='button' variant='secondary'>
              Cancel
            </Button>
          </DialogClose>

          <Button onClick={() => setGeneratedPassword(password)}>
            Choose password
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
