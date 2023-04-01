import { useSelector } from 'react-redux'

function Notification() {
  const notification = useSelector((state) => state.notification)
  if (!notification || !notification.message) {
    return null
  }

  return <div className={notification.type}>{notification.message}</div>
}

export default Notification
