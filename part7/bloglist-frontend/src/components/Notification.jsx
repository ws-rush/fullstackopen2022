import { Alert } from '@mui/material'
import { useSelector } from 'react-redux'

function Notification() {
  const notification = useSelector((state) => state.notification)
  if (!notification || !notification.message) {
    return null
  }

  return <Alert severity={notification.type}>{notification.message}</Alert>
}

export default Notification
