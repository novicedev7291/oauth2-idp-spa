import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root, { loader as rootLoader, action as rootAction } from './routes/root'
import Error from './error'
import User, { loader as userLoader } from './routes/user'
import EditUser, { action as editAction } from './routes/edit'
import { action as destroyAction } from './routes/destroy'
import Index from './routes/index'
import AuthDialog from './auth-dialog'

let router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <Error />,
        loader: rootLoader,
        action: rootAction,
        children: [
            {
                index: true,
                element: <Index />,
            },
            {
                path: 'users/:userId',
                element: <User />,
                loader: userLoader
            },
            {
                path: 'users/:userId/edit',
                element: <EditUser />,
                loader: userLoader,
                action: editAction
            },
            {
                path: 'users/:userId/destroy',
                action: destroyAction
            }
        ]
    },
    {
        path: '/oauth2/callback',
        element: <AuthDialog />,
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
