import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

function Component() {
  const user = useSelector((state) => state.user)
  // const user = null
  if (!user) {
    return <Navigate to="/login" />
  }

  return <Outlet />
}

export default { Component }
