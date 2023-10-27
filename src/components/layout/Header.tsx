import { LockKeyhole } from 'lucide-react'

export default function Header() {
  return (
    <header className=' px-4 py-2 flex justify-between items-center container gap-1 fixed top-0 left-0 right-0 bg-background m-auto border-b border-accent'>
      <div className='flex gap-2 items-center'>
        <h2 className='text-2xl font-bold mr-auto'>Vaulty</h2>
        <LockKeyhole size={20} />
      </div>
    </header>
  )
}
