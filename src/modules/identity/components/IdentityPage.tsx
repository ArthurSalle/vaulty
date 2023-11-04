import { LoaderFunction, redirect, useLoaderData } from 'react-router-dom'
import { getIdentity } from '../storage/storage'
import { Identity } from '../helpers/create-identity'

export const IdentityLoader: LoaderFunction = ({ params }) => {
  const identity = getIdentity(params.identityId!)

  if (!identity) {
    return redirect('/identity')
  }

  return identity
}

export const IdentityPage = () => {
  const identity = useLoaderData() as Identity

  return <div>{identity.firstname}</div>
}
