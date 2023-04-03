import { useDispatch } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Notification from './components/Notification'
import Login from './pages/Login'
import Blogs, { blogsAction } from './pages/Blogs'
import Blog from './pages/Blog'
import Users from './pages/Users'
import User from './pages/User'
import MainLayout from './layouts/MainLayout'

function routing(hooks) {
  return createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          element: null,
          children: [
            {
              path: '/',
              element: <Blogs />,
              action: blogsAction,
            },
            { path: '/blogs:id', element: <Blog /> },
            { path: '/users', element: <Users /> },
            { path: '/users/:id', element: <User /> },
            {
              path: '/login',
              // element: <Login.Component />,
              Component: Login.Component,
              action: (args) => Login.action({ ...args, ...hooks }),
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
