import { useSelector } from 'react-redux'

function Notification() {
  const notification = useSelector((state) => state.nottification)
  if (notification.message === null) {
    return null
  }

  return <div className={notification.type}>{notification.message}</div>
}

export default Notification
