import {
  Fingerprint,
  Home,
  LockKeyhole,
  Settings,
  UnlockKeyhole,
  WalletCards,
} from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'

const svgGradient = (
  <svg width='0' height='0'>
    <linearGradient id='vaulty-gradient' x1='100%' y1='100%' x2='0%' y2='0%'>
      <stop stopColor='#fbbf24' offset='0%' />
      <stop stopColor='#f87171' offset='100%' />
    </linearGradient>
  </svg>
)

export const NavDesktop = () => {
  const { pathname } = useLocation()

  return (
    <>
      <nav className='flex flex-col max-w-[64px] w-full min-h-screen justify-center items-center border-r'>
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
          >
            {pathname.includes('connection') ? (
              <>
                {svgGradient}
                <UnlockKeyhole
                  size={25}
                  strokeWidth={1.8}
                  style={{ stroke: 'url(#vaulty-gradient)' }}
                />
              </>
            ) : (
              <LockKeyhole size={25} strokeWidth={1.8} />
            )}
          </NavLink>

          <NavLink
            to='/wallet'
            className={({ isActive }) =>
              isActive
                ? 'bg-muted p-3 rounded-full'
                : 'p-3 hover:bg-muted rounded-full transition-colors hover:duration-300'
            }
          >
            {pathname.includes('wallet') ? (
              <>
                {svgGradient}
                <WalletCards
                  size={25}
                  strokeWidth={1.8}
                  style={{ stroke: 'url(#vaulty-gradient)' }}
                />
              </>
            ) : (
              <WalletCards size={25} strokeWidth={1.8} />
            )}
          </NavLink>

          <NavLink
            to='/identity'
            className={({ isActive }) =>
              isActive
                ? 'bg-muted p-3 rounded-full'
                : 'p-3 hover:bg-muted rounded-full transition-colors hover:duration-300'
            }
          >
            {pathname.includes('identity') ? (
              <>
                {svgGradient}
                <Fingerprint
                  size={25}
                  strokeWidth={1.8}
                  style={{ stroke: 'url(#vaulty-gradient)' }}
                />
              </>
            ) : (
              <Fingerprint size={25} strokeWidth={1.8} />
            )}
          </NavLink>

          <NavLink
            to='/settings'
            className={({ isActive }) =>
              isActive
                ? 'bg-muted p-3 rounded-full'
                : 'p-3 hover:bg-muted rounded-full transition-colors hover:duration-300'
            }
          >
            {pathname.includes('settings') ? (
              <>
                {svgGradient}
                <Settings
                  size={25}
                  strokeWidth={1.8}
                  style={{ stroke: 'url(#vaulty-gradient)' }}
                />
              </>
            ) : (
              <Settings size={25} strokeWidth={1.8} />
            )}
          </NavLink>
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
      <nav className='bg-background fixed bottom-0 left-0 right-0 z-50 w-full py-2 border-t'>
        <ul className='flex justify-center items-center gap-6 sm:gap-10'>
          <NavLink
            to='/'
            className={({ isActive }) =>
              isActive
                ? 'bg-muted p-2 rounded-full'
                : 'p-2 hover:bg-muted rounded-full transition-colors hover:duration-300'
            }
          >
            {pathname === '/' ? (
              <>
                {svgGradient}
                <Home
                  size={20}
                  strokeWidth={1.8}
                  style={{ stroke: 'url(#vaulty-gradient)' }}
                />
              </>
            ) : (
              <Home size={20} strokeWidth={1.8} />
            )}
          </NavLink>

          <NavLink
            to='/connection'
            className={() =>
              pathname.includes('connection')
                ? 'bg-muted p-2 rounded-full'
                : 'p-2 hover:bg-muted rounded-full transition-colors hover:duration-300'
            }
          >
            {pathname.includes('connection') ? (
              <>
                {svgGradient}
                <UnlockKeyhole
                  size={20}
                  strokeWidth={1.8}
                  style={{ stroke: 'url(#vaulty-gradient)' }}
                />
              </>
            ) : (
              <LockKeyhole size={20} strokeWidth={1.8} />
            )}
          </NavLink>

          <NavLink
            to='/wallet'
            className={({ isActive }) =>
              isActive
                ? 'bg-muted p-2 rounded-full'
                : 'p-2 hover:bg-muted rounded-full transition-colors hover:duration-300'
            }
          >
            {pathname.includes('wallet') ? (
              <>
                {svgGradient}
                <WalletCards
                  size={20}
                  strokeWidth={1.8}
                  style={{ stroke: 'url(#vaulty-gradient)' }}
                />
              </>
            ) : (
              <WalletCards size={20} strokeWidth={1.8} />
            )}
          </NavLink>

          <NavLink
            to='/identity'
            className={({ isActive }) =>
              isActive
                ? 'bg-muted p-2 rounded-full'
                : 'p-2 hover:bg-muted rounded-full transition-colors hover:duration-300'
            }
          >
            {pathname.includes('identity') ? (
              <>
                {svgGradient}
                <Fingerprint
                  size={20}
                  strokeWidth={1.8}
                  style={{ stroke: 'url(#vaulty-gradient)' }}
                />
              </>
            ) : (
              <Fingerprint size={20} strokeWidth={1.8} />
            )}
          </NavLink>

          <NavLink
            to='/settings'
            className={({ isActive }) =>
              isActive
                ? 'bg-muted p-2 rounded-full'
                : 'p-2 hover:bg-muted rounded-full transition-colors hover:duration-300'
            }
          >
            {pathname.includes('settings') ? (
              <>
                {svgGradient}
                <Settings
                  size={20}
                  strokeWidth={1.8}
                  style={{ stroke: 'url(#vaulty-gradient)' }}
                />
              </>
            ) : (
              <Settings size={20} strokeWidth={1.8} />
            )}
          </NavLink>
        </ul>
      </nav>
    </>
  )
}
