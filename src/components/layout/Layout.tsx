import { Nav } from './Nav'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className='flex'>
      <Nav />

      <Outlet />
    </div>
  )
}
