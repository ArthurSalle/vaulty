import { Toaster } from '../ui/toaster'
import { NavDesktop, NavMobile } from '../../modules/shared/components/Nav'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className='flex max-h-[calc(100vh-53px)] md:max-h-[100dvh] h-full relative'>
      <NavDesktop />
      <NavMobile />

      <Outlet />
      <Toaster />
    </div>
  )
}
