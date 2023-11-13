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
      <nav className='hidden md:flex flex-col max-w-[64px] w-full min-h-screen justify-center items-center border-r'>
        <div className='mb-auto mt-4'>
          <NavLink
            to='/'
            className='p-4'
            children={() => (
              <span className='font-semibold text-3xl'>
                v
                <span className='bg-gradient-to-r from-red-400 to-amber-400 text-transparent bg-clip-text'>
                  .
                </span>
              </span>
            )}
          />
        </div>

        <ul className='my-auto h-1/2 flex flex-col justify-around'>
          <NavLink
            to='/connection'
            className={() =>
              pathname.includes('connection')
                ? 'bg-muted p-3 rounded-full'
                : 'p-3 hover:bg-muted rounded-full transition-colors hover:duration-300'
            }
            children={() =>
              pathname.includes('connection') ? (
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

        <div
          className='mt-auto block invisible overflow-hidden'
          aria-hidden
          tabIndex={-1}
        >
          <span className='font-semibold text-3xl'>
            v
            <span className='bg-gradient-to-r from-red-400 to-amber-400 text-transparent bg-clip-text'>
              .
            </span>
          </span>
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
            to='/connection'
            className={() =>
              pathname === '/' || pathname === '/connection'
                ? 'bg-muted p-2 rounded-full'
                : 'p-2 hover:bg-muted rounded-full transition-colors hover:duration-300'
            }
            children={() =>
              pathname === '/' || pathname === '/connection' ? (
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
