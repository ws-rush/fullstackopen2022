import { Outlet } from 'react-router-dom'
import Nav from '../components/Nav'

function Component() {
  return (
    <>
      <Nav />
      <h1>blog app</h1>
      <Outlet />
    </>
  )
}

export default { Component }
