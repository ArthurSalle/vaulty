import { Toaster } from '../ui/toaster'
import { NavDesktop, NavMobile } from '../../modules/shared/components/Nav'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className='flex w-full h-full relative'>
      <NavDesktop />
      <NavMobile />

      <Outlet />
      <Toaster />
    </div>
  )
}
