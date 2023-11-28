import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, X } from 'lucide-react'
import { ChangeEvent } from 'react'
import { Link } from 'react-router-dom'

type SearchBarProps = {
  search: string
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  onClear: () => void
}

export const SearchBar = ({
  search,
  handleChange,
  onClear,
}: SearchBarProps) => {
  return (
    <div className='flex gap-3 pb-6 px-4 border-b'>
      <div className='relative flex items-center w-full'>
        <Input placeholder='Search' value={search} onChange={handleChange} />
        {search !== '' ? (
          <X
            size={20}
            className='absolute right-2 rounded-full cursor-pointer text-muted-foreground'
            onClick={onClear}
          />
        ) : null}
      </div>

      <Link
        to='/wallet/new'
        className={buttonVariants({
          size: 'icon',
          variant: 'outline',
        })}
      >
        <Plus />
      </Link>
    </div>
  )
}
