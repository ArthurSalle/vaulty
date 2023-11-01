import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import ErrorPage from './modules/shared/components/error-page'
import { Vault } from './routes/vault'
import { Wallet } from './routes/wallet'
import { Identity } from './routes/identity'
import { Settings } from './routes/settings'
import { CreateIdentity } from './modules/identity/CreateIdentity'
import { IdentitiesLoader, IdentityList } from './modules/identity/IdentityList'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Vault /> },
      {
        path: '/vault',
        element: <Vault />,
      },
      {
        path: '/wallet',
        element: <Wallet />,
      },
      {
        path: '/identity',
        element: <Identity />,
        children: [
          {
            path: '',
            element: <IdentityList />,
            loader: IdentitiesLoader,
            children: [
              {
                path: '',
                element: <p>hello</p>,
              },
              {
                path: 'new',
                element: <CreateIdentity />,
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
