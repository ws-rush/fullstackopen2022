import { Outlet } from 'react-router-dom'
import Nav from '../components/Nav'

export default function MainLayout() {
  return (
    <>
      <Nav />
      <h1>blog app</h1>
      <Outlet />
    </>
  )
}
