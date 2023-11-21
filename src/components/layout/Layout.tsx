import { Toaster } from '../ui/toaster'
import { NavDesktop, NavMobile } from '../../modules/shared/components/Nav'
import { Outlet } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { useMediaQuery } from 'usehooks-ts'

export default function Layout() {
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <div className='flex w-full h-full relative'>
      {isMobile ? <NavMobile /> : <NavDesktop />}
      <Outlet />
      <Toaster />
      <Analytics debug={false} />
    </div>
  )
}
