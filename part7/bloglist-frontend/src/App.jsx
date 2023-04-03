import { useDispatch } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Notification from './components/Notification'
import Login from './pages/Login'
import Blogs from './pages/Blogs'
import Blog from './pages/Blog'
import Users from './pages/Users'
import User from './pages/User'
import MainLayout from './layouts/MainLayout'

function routing(hooks) {
  return createBrowserRouter([
    {
      path: '/',
      element: <MainLayout.Component />,
      children: [
        {
          element: null,
          children: [
            { index: true, ...Blogs },
            { path: 'blogs:id', ...Blog },
            { path: 'users', ...Users },
            { path: 'users/:id', ...User },
            {
              path: '/login',
              action: (args) => Login.action({ ...args, ...hooks }),
              Component: Login.Component,
              // element: <Login.Component />,
            },
          ],
        },
      ],
    },
  ])
}

export default function App() {
  const dispatch = useDispatch()
  const hooks = { dispatch }
  const router = routing(hooks)
  return (
    <>
      <Notification />
      <RouterProvider router={router} />
    </>
  )
}
