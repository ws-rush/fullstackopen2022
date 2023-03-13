import { useSelector } from 'react-redux'

export default function Notification() {
  const message = useSelector(state => state.message)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (message === null) return null
  return (
    <div style={style}>
      {message}
    </div>
  )
}