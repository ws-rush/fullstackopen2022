import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Notification from './components/Notification'
import Login from './pages/Login'
import Blogs from './pages/Blogs'
import Users from './pages/Users'
import User from './pages/User'
import MainLayout from './layouts/MainLayout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Blogs /> },
      { path: '/users', element: <Users /> },
      { path: '/users/:id', element: <User /> },
      { path: '/login', element: <Login /> },
    ],
  },
])

export default function App() {
  return (
    <>
      <Notification />
      <RouterProvider router={router} />
    </>
  )
}
