import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Container } from '@mui/material'
import Notification from './components/Notification'
import Login from './pages/Login'
import Blogs from './pages/Blogs'
import Blog from './pages/Blog'
import Users from './pages/Users'
import User from './pages/User'
import MainLayout from './layouts/MainLayout'
import ProtectLayout from './layouts/ProtectLayout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout.Component />,
    children: [
      {
        path: 'login',
        Component: Login,
      },
      {
        element: <ProtectLayout />,
        children: [
          { index: true, Component: Blogs },
          { path: 'blogs/:id', Component: Blog },
          { path: 'users', Component: Users },
          { path: 'users/:id', Component: User },
        ],
      },
    ],
  },
])

export default function App() {
  return (
    <Container>
      <Notification />
      <RouterProvider router={router} />
    </Container>
  )
}
