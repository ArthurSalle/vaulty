import {
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { Identity } from '../modules/identity/helpers/create-identity'
import { getIdentities } from '../modules/identity/storage/storage'
import { ChangeEvent, useDeferredValue, useEffect, useState } from 'react'
import { filterIdentities } from '../modules/identity/helpers/helpers'
import { SearchBar } from '../modules/identity/components/SearchBar'
import { IdentitiesList } from '../modules/identity/components/IdentitiesList'
import { useMediaQuery } from 'usehooks-ts'

export function identitiesLoader() {
  return getIdentities()
}

export const Identities = () => {
  const identities = useLoaderData() as Identity[]
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
    const firstIdentity = identities[0]
    const matchLocationPathname =
      location.pathname === '/identity' || location.pathname === '/identity/'

    if (isDesktop && firstIdentity && matchLocationPathname) {
      navigate(`/identity/${firstIdentity.id}`, {
        replace: true,
      })
    }
  }, [identities, location, isDesktop])

  return (
    <div className='flex w-full h-[100dvh] relative'>
      <div className='flex flex-col pt-4 w-full md:max-w-[250px] lg:max-w-xs max-h-[calc(100dvh-53px)] md:max-h-[100dvh] border-r flex-shrink-0'>
        <SearchBar
          search={search}
          handleChange={handleSearchChange}
          onClear={clearSearch}
        />

        <IdentitiesList
          identities={filterIdentities(deferredSearch, identities)}
        />
      </div>

      <div className='w-full h-full min-h-[100dvh]'>
        <Outlet />
      </div>
    </div>
  )
}
