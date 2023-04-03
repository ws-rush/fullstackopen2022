import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectLayout() {
  const user = useSelector((state) => state.user)
  if (!user) {
    return <Navigate to="/login" />
  }

  return <Outlet />
}
