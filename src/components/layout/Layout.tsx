import { Toaster } from '../ui/toaster'
import { Nav } from '../../modules/shared/components/Nav'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className='flex max-h-screen h-full'>
      <Nav />

      <Outlet />
      <Toaster />
    </div>
  )
}
