import {
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { getConnections } from '../storage/storage'
import { Connection } from '../helpers/create-connection'
import { ChangeEvent, useDeferredValue, useEffect, useState } from 'react'
import { filterConnections } from '../helpers/helpers'
import { SearchBar } from './SearchBar'
import { ConnectionsList } from './ConnectionsList'
import { useMediaQuery } from 'usehooks-ts'

export function connectionsLoader() {
  return getConnections()
}

export const Connections = () => {
  const connections = useLoaderData() as Connection[]
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const deferredSearch = useDeferredValue(search)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
  }

  function clearSearch() {
    setSearch('')
  }

  useEffect(() => {
    const firstConnectionId = connections[0]?.id
    const matchLocationPathname =
      location.pathname === '/connection' ||
      location.pathname === '/connection/'

    if (isDesktop && firstConnectionId && matchLocationPathname) {
      navigate(`/connection/${firstConnectionId}`, {
        replace: true,
      })
    }
  }, [connections, location, isDesktop])

  return (
    <div className='flex w-full h-[100dvh] relative'>
      <div className='flex flex-col pt-4 w-full md:max-w-[250px] lg:max-w-xs max-h-[calc(100dvh-53px)] md:max-h-[100dvh] border-r flex-shrink-0'>
        <SearchBar
          search={search}
          handleChange={handleSearchChange}
          onClear={clearSearch}
        />

        <ConnectionsList
          connectionsList={filterConnections(deferredSearch, connections)}
        />
      </div>

      <div className='w-full h-full min-h-[100dvh]'>
        <Outlet />
      </div>
    </div>
  )
}
