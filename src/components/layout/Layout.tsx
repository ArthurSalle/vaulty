import { Toaster } from '../ui/toaster'
import { NavDesktop, NavMobile } from '../../modules/shared/components/Nav'
import { Outlet } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'

// useMedia for render nav
export default function Layout() {
  return (
    <div className='flex w-full h-full relative'>
      <NavDesktop />
      <NavMobile />
      <Outlet />
      <Toaster />
      <Analytics debug={false} />
    </div>
  )
}
