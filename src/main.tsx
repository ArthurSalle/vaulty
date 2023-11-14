import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import ErrorPage from './modules/shared/components/error-page'
import { Connection } from './routes/connection'
import { Wallet } from './routes/wallet'
import { Identity } from './routes/identity'
import { Settings } from './routes/settings'
import {
  CreateIdentity,
  action as IdentityAction,
} from './modules/identity/components/CreateIdentity'
import {
  IdentitiesLoader,
  IdentityList,
} from './modules/identity/components/IdentityList'
import {
  IdentityLoader,
  IdentityPage,
  action as IdentityIdAction,
} from './modules/identity/components/IdentityPage'
import {
  EditIdentity,
  action as EditIdentityIdAction,
} from './modules/identity/components/EditIdentity'
import { IdentityHome } from './modules/identity/components/IdentityHome'
import { ConnectionHome } from './modules/connection/components/ConnectionHome'
import { WalletHome } from './modules/wallet/components/WalletHome'
import {
  ConnectionsLoader,
  ConnectionList,
} from './modules/connection/components/ConnectionList'
import {
  CreateConnection,
  action as ConnectionAction,
} from './modules/connection/components/CreateConnection'
import {
  ConnectionPage,
  ConnectionLoader,
  action as ConnectionIdAction,
} from './modules/connection/components/ConnectionPage'
import {
  EditConnection,
  action as EditConnectionIdAction,
} from './modules/connection/components/EditConnection'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Connection /> },
      {
        path: '/connection',
        element: <Connection />,
        children: [
          {
            path: '',
            element: <ConnectionList />,
            loader: ConnectionsLoader,
            shouldRevalidate: () => {
              // console.log(args)
              // return args.formMethod === 'post'
              return true
            },
            children: [
              {
                path: '',
                index: true,
                element: <ConnectionHome />,
              },
              {
                path: 'new',
                element: <CreateConnection />,
                action: ConnectionAction,
              },
              {
                path: ':connectionId',
                element: <ConnectionPage />,
                loader: ConnectionLoader,
                action: ConnectionIdAction,
              },
              {
                path: ':connectionId/edit',
                element: <EditConnection />,
                loader: ConnectionLoader,
                action: EditConnectionIdAction,
              },
            ],
          },
        ],
      },
      {
        path: '/wallet',
        element: <Wallet />,
        children: [
          {
            path: '',
            element: <WalletHome />,
          },
        ],
      },
      {
        path: '/identity',
        element: <Identity />,
        children: [
          {
            path: '',
            element: <IdentityList />,
            loader: IdentitiesLoader,
            shouldRevalidate: (args) => {
              // console.log('first')
              // return args.formMethod === 'post' || args.formMethod === 'POST'
              return true
            },
            children: [
              {
                path: '',
                index: true,
                element: <IdentityHome />,
              },
              {
                path: ':identityId',
                element: <IdentityPage />,
                loader: IdentityLoader,
                action: IdentityIdAction,
              },
              {
                path: ':identityId/edit',
                element: <EditIdentity />,
                loader: IdentityLoader,
                action: EditIdentityIdAction,
              },
              {
                path: 'new',
                element: <CreateIdentity />,
                action: IdentityAction,
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
