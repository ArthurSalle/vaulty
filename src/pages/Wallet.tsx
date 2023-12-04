import {
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { SearchBar } from '../modules/wallet/components/SearchBar'
import { getCreditCards } from '../modules/wallet/storage/storage'
import { CreditCard } from '../modules/wallet/helpers/create-credit-card'
import { CreditCardsList } from '../modules/wallet/components/CreditCardsList'
import { ChangeEvent, useDeferredValue, useEffect, useState } from 'react'
import { filterCreditCards } from '../modules/wallet/helpers/helpers'
import { useMediaQuery } from 'usehooks-ts'

export function walletLoader() {
  return getCreditCards()
}

export const Wallet = () => {
  const creditCards = useLoaderData() as CreditCard[]
  const [search, setSearch] = useState('')
  const deferredSearch = useDeferredValue(search)
  const navigate = useNavigate()
  const location = useLocation()
  const isDesktop = useMediaQuery('(min-width: 768px)')

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
  }

  function clearSearch() {
    setSearch('')
  }

  useEffect(() => {
    const firstCreditCard = creditCards[0]
    const matchLocationPathname =
      location.pathname === '/wallet' || location.pathname === '/wallet/'

    if (isDesktop && firstCreditCard && matchLocationPathname) {
      navigate(`/wallet/${firstCreditCard.id}`, {
        replace: true,
      })
    }
  }, [creditCards, location, isDesktop])

  return (
    <div className='flex w-full h-[100dvh] relative'>
      <div className='flex flex-col pt-4 w-full md:max-w-[250px] lg:max-w-xs max-h-[calc(100dvh-53px)] md:max-h-[100dvh] border-r flex-shrink-0'>
        <SearchBar
          search={search}
          handleChange={handleSearchChange}
          onClear={clearSearch}
        />

        <CreditCardsList
          creditCards={filterCreditCards(deferredSearch, creditCards)}
        />
      </div>

      <div className='w-full h-full min-h-[100dvh]'>
        <Outlet />
      </div>
    </div>
  )
}
