import { Outlet, useLoaderData } from 'react-router-dom'
import { SearchBar } from './SearchBar'
import { getCreditCards } from '../storage/storage'
import { CreditCard } from '../helpers/create-credit-card'
import { CreditCardsList } from './CreditCardsList'
import { ChangeEvent, useDeferredValue, useState } from 'react'
import { filterCreditCards } from '../helpers/helpers'

export function walletLoader() {
  return getCreditCards()
}

export const Wallet = () => {
  const creditCards = useLoaderData() as CreditCard[]
  const [search, setSearch] = useState('')
  const deferredSearch = useDeferredValue(search)

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
  }

  function clearSearch() {
    setSearch('')
  }

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
