import { Alert } from '@mui/material'
import { useStore } from '../zux'

function Notification() {
  const notification = useStore('notification')
  if (!notification.state || !notification.state.message) {
    return null
  }

  return <Alert severity={notification.state.type}>{notification.state.message}</Alert>
}

export default Notification
