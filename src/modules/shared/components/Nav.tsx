import {
  Fingerprint,
  LockKeyhole,
  Settings,
  UnlockKeyhole,
  WalletCards,
} from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'

export const NavDesktop = () => {
  const { pathname } = useLocation()

  return (
    <>
      <nav className='hidden md:flex max-w-[64px] w-full min-h-screen justify-center items-center border-r'>
        <ul className='h-1/2 flex flex-col justify-around'>
          <NavLink
            to='/vault'
            className={() =>
              pathname === '/' || pathname === '/vault'
                ? 'bg-muted p-3 rounded-full'
                : 'p-3 hover:bg-muted rounded-full transition-colors hover:duration-300'
            }
            children={() =>
              pathname === '/' || pathname === '/vault' ? (
                <UnlockKeyhole size={25} strokeWidth={1.7} />
              ) : (
                <LockKeyhole size={25} strokeWidth={1.7} />
              )
            }
          />

          <NavLink
            to='/wallet'
            className={({ isActive }) =>
              isActive
                ? 'bg-muted p-3 rounded-full'
                : 'p-3 hover:bg-muted rounded-full transition-colors hover:duration-300'
            }
            children={<WalletCards size={25} strokeWidth={1.7} />}
          />

          <NavLink
            to='/identity'
            className={({ isActive }) =>
              isActive
                ? 'bg-muted p-3 rounded-full'
                : 'p-3 hover:bg-muted rounded-full transition-colors hover:duration-300'
            }
            children={<Fingerprint size={25} strokeWidth={1.7} />}
          />

          <NavLink
            to='/settings'
            className={({ isActive }) =>
              isActive
                ? 'bg-muted p-3 rounded-full'
                : 'p-3 hover:bg-muted rounded-full transition-colors hover:duration-300'
            }
            children={<Settings size={25} strokeWidth={1.7} />}
          />
        </ul>

        <div className='fixed bottom-0'>
          <span className='font-semibold'>vaulty</span>
        </div>
      </nav>
    </>
  )
}

export const NavMobile = () => {
  const { pathname } = useLocation()

  return (
    <>
      <nav className='block md:hidden bg-white fixed bottom-0 left-0 right-0 z-50 w-full py-2 border-t'>
        <ul className='flex justify-center items-center gap-10'>
          <NavLink
            to='/vault'
            className={() =>
              pathname === '/' || pathname === '/vault'
                ? 'bg-muted p-2 rounded-full'
                : 'p-2 hover:bg-muted rounded-full transition-colors hover:duration-300'
            }
            children={() =>
              pathname === '/' || pathname === '/vault' ? (
                <UnlockKeyhole size={20} strokeWidth={1.7} />
              ) : (
                <LockKeyhole size={20} strokeWidth={1.7} />
              )
            }
          />

          <NavLink
            to='/wallet'
            className={({ isActive }) =>
              isActive
                ? 'bg-muted p-2 rounded-full'
                : 'p-2 hover:bg-muted rounded-full transition-colors hover:duration-300'
            }
            children={<WalletCards size={20} strokeWidth={1.7} />}
          />

          <NavLink
            to='/identity'
            className={({ isActive }) =>
              isActive
                ? 'bg-muted p-2 rounded-full'
                : 'p-2 hover:bg-muted rounded-full transition-colors hover:duration-300'
            }
            children={<Fingerprint size={20} strokeWidth={1.7} />}
          />

          <NavLink
            to='/settings'
            className={({ isActive }) =>
              isActive
                ? 'bg-muted p-2 rounded-full'
                : 'p-2 hover:bg-muted rounded-full transition-colors hover:duration-300'
            }
            children={<Settings size={20} strokeWidth={1.7} />}
          />
        </ul>
      </nav>
    </>
  )
}
