import { Moon, RefreshCcw, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from '@/components/themes/theme-provider'
import { resetLocalStorage } from '@/modules/shared/lib/utils'
import { Separator } from '@/components/ui/separator'

export function Settings() {
  const { setTheme } = useTheme()

  return (
    <div className='h-full w-full p-5'>
      <h1 className='text-2xl font-semibold'>Settings</h1>

      <div className='max-w-lg mx-auto mt-14 flex flex-col gap-8'>
        <div className='flex items-center justify-between'>
          <div className=''>
            <span className='text-lg font-medium block'>Dark mode</span>
            <span className='block text-muted-foreground'>
              Select the theme color
            </span>
          </div>

          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='icon'>
                  <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
                  <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
                  <span className='sr-only'>Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='center'>
                <DropdownMenuItem onClick={() => setTheme('light')}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Separator />

        <div className='flex items-center justify-between gap-2 [text-wrap:balance]'>
          <div className='flex flex-col'>
            <span className='text-lg font-medium'>Reset localStorage</span>
            <span className='text-muted-foreground'>
              Reset all modules with example values
            </span>
          </div>

          <div>
            <Button variant='outline' size='icon' onClick={resetLocalStorage}>
              <RefreshCcw className='h-[1.2rem] w-[1.2rem]' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
