import { Outlet, createBrowserRouter } from 'react-router-dom'
import {
  CreateCreditCard,
  createCreditCardAction,
} from '@/modules/wallet/components/CreateCreditCard'
import {
  ReadCreditCard,
  creditCardAction,
  readCreditCardLoader,
} from '@/modules/wallet/components/ReadCreditCard'
import {
  EditCreditCard,
  editCreditCardAction,
} from '@/modules/wallet/components/EditCreditCard'
import App from './App'
import ErrorPage from './modules/shared/components/error-page'
import { VaultyHome } from './pages/VaultyHome'
import { Connections, connectionsLoader } from './pages/Connections'
import {
  ReadConnection,
  connectionLoader,
} from './modules/connection/components/ReadConnection'
import {
  CreateConnection,
  createConnectionAction,
} from './modules/connection/components/CreateConnection'
import {
  EditConnection,
  editConnectionAction,
} from './modules/connection/components/EditConnection'
import { Wallet, walletLoader } from './pages/Wallet'
import { Identities, identitiesLoader } from './pages/Identities'
import {
  ReadIdentity,
  identityAction,
  identityLoader,
} from './modules/identity/components/ReadIdentity'
import {
  EditIdentity,
  editIdentityAction,
} from './modules/identity/components/EditIdentity'
import {
  CreateIdentity,
  createIdentityAction,
} from './modules/identity/components/CreateIdentity'
import { Settings } from './pages/Settings'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <VaultyHome /> },
      {
        path: '/connection',
        element: <Outlet />,
        children: [
          {
            path: '',
            element: <Connections />,
            loader: connectionsLoader,
            shouldRevalidate: ({ formMethod }) => {
              return formMethod === 'post' || formMethod === 'get'
            },
            children: [
              {
                path: ':connectionId',
                index: true,
                element: <ReadConnection />,
                loader: connectionLoader,
              },
              {
                path: 'new',
                element: <CreateConnection />,
                action: createConnectionAction,
              },
              {
                path: ':connectionId/edit',
                element: <EditConnection />,
                loader: connectionLoader,
                action: editConnectionAction,
              },
            ],
          },
        ],
      },
      {
        path: '/wallet',
        element: <Outlet />,
        children: [
          {
            path: '',
            element: <Wallet />,
            loader: walletLoader,
            shouldRevalidate: ({ formMethod }) => {
              return formMethod === 'post' || formMethod === 'get'
            },
            children: [
              {
                path: 'new',
                element: <CreateCreditCard />,
                action: createCreditCardAction,
              },
              {
                path: ':creditCardId',
                element: <ReadCreditCard />,
                loader: readCreditCardLoader,
                action: creditCardAction,
              },
              {
                path: ':creditCardId/edit',
                element: <EditCreditCard />,
                loader: readCreditCardLoader,
                action: editCreditCardAction,
              },
            ],
          },
        ],
      },
      {
        path: '/identity',
        element: <Outlet />,
        children: [
          {
            path: '',
            element: <Identities />,
            loader: identitiesLoader,
            shouldRevalidate: ({ formMethod }) => {
              return formMethod === 'post' || formMethod === 'get'
            },
            children: [
              {
                path: ':identityId',
                index: true,
                element: <ReadIdentity />,
                loader: identityLoader,
                action: identityAction,
              },
              {
                path: ':identityId/edit',
                element: <EditIdentity />,
                loader: identityLoader,
                action: editIdentityAction,
              },
              {
                path: 'new',
                element: <CreateIdentity />,
                action: createIdentityAction,
              },
            ],
          },
        ],
      },
      {
        path: '/settings',
        element: <Settings />,
      },
    ],
  },
])
