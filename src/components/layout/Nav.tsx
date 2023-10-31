import {
  Fingerprint,
  LockKeyhole,
  Settings,
  UnlockKeyhole,
  WalletCards,
} from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import Footer from './Footer'

export const Nav = () => {
  const { pathname } = useLocation()

  return (
    <>
      <nav className='w-16 h-screen flex justify-center items-center border-r'>
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
                <UnlockKeyhole size={25} strokeWidth={1.5} />
              ) : (
                <LockKeyhole size={25} strokeWidth={1.5} />
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
            children={<WalletCards size={25} strokeWidth={1.5} />}
          />

          <NavLink
            to='/identity'
            className={({ isActive }) =>
              isActive
                ? 'bg-muted p-3 rounded-full'
                : 'p-3 hover:bg-muted rounded-full transition-colors hover:duration-300'
            }
            children={<Fingerprint size={25} strokeWidth={1.5} />}
          />

          <NavLink
            to='/settings'
            className={({ isActive }) =>
              isActive
                ? 'bg-muted p-3 rounded-full'
                : 'p-3 hover:bg-muted rounded-full transition-colors hover:duration-300'
            }
            children={<Settings size={25} strokeWidth={1.5} />}
          />
        </ul>

        <div className='fixed bottom-0'>
          <Footer />
        </div>
      </nav>
    </>
  )
}
