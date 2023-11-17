import { Outlet, createBrowserRouter } from 'react-router-dom'
import App from '../App'
import ErrorPage from '../modules/shared/components/error-page'
import { VaultyHome } from './VaultyHome'
import {
  Connections,
  connectionsLoader,
} from '../modules/connection/components/Connections'
import {
  ReadConnection,
  connectionLoader,
} from '../modules/connection/components/ReadConnection'
import {
  CreateConnection,
  createConnectionAction,
} from '../modules/connection/components/CreateConnection'
import {
  EditConnection,
  editConnectionAction,
} from '../modules/connection/components/EditConnection'
import { WalletHome } from '../modules/wallet/components/WalletHome'
import {
  Identities,
  identitiesLoader,
} from '../modules/identity/components/Identities'
import {
  ReadIdentity,
  identityAction,
  identityLoader,
} from '../modules/identity/components/ReadIdentity'
import {
  EditIdentity,
  editIdentityAction,
} from '../modules/identity/components/EditIdentity'
import {
  CreateIdentity,
  createIdentityAction,
} from '../modules/identity/components/CreateIdentity'
import { Settings } from './settings'

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
            shouldRevalidate: (args) => {
              return args.formMethod === 'post' || args.formMethod === 'get'
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
            element: <WalletHome />,
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
            shouldRevalidate: (args) => {
              return args.formMethod === 'post' || args.formMethod === 'get'
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
