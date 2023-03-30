import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Notification from './components/Notification'
import Login from './pages/Login'
import Blogs from './pages/Blogs'
import MainLayout from './layouts/MainLayout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Blogs /> },
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
