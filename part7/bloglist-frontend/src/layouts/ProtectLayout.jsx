import { Outlet, Navigate } from 'react-router-dom'
import { useStore } from '../zux'

export default function ProtectLayout() {
  const user = useStore('user')
  if (!user.state) {
    return <Navigate to="/login" />
  }

  return <Outlet />
}
