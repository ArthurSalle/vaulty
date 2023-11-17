import {
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { Identity } from '../helpers/create-identity'
import { getIdentities } from '../storage/storage'
import { ChangeEvent, useEffect, useState } from 'react'
import { filterIdentities } from '../helpers/helpers'
import { SearchBar } from './SearchBar'
import { IdentitiesList } from './IdentitiesList'

export function identitiesLoader() {
  return getIdentities()
}

export const Identities = () => {
  const identities = useLoaderData() as Identity[]
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState<Identity[]>(identities)
  const navigate = useNavigate()
  const location = useLocation()

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
    setSearchResults(filterIdentities(event.target.value, identities))
  }

  function clearSearch() {
    setSearch('')
    setSearchResults(identities)
  }

  useEffect(() => {
    setSearchResults(filterIdentities(search, identities))
  }, [search, identities])

  useEffect(() => {
    const firstIdentity = identities[0]
    const matchLocationPathname =
      location.pathname === '/identity' || location.pathname === '/identity/'

    if (firstIdentity && matchLocationPathname) {
      navigate(`/identity/${firstIdentity.id}`, {
        replace: true,
      })
    }
  }, [identities, location])

  return (
    <div className='flex w-full h-[100dvh] relative'>
      <div className='flex flex-col pt-4 w-full md:max-w-[250px] lg:max-w-xs max-h-[calc(100dvh-53px)] md:max-h-[100dvh] border-r flex-shrink-0'>
        <SearchBar
          search={search}
          handleChange={handleSearchChange}
          onClear={clearSearch}
        />

        <IdentitiesList identities={searchResults} />
      </div>

      <div className='w-full h-full min-h-[100dvh]'>
        <Outlet />
      </div>
    </div>
  )
}
