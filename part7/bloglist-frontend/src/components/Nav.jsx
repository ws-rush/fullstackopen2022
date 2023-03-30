import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from '../libs/rush'

export default function Nav() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch({ type: 'user/clearUser' })
    navigate('/login')
  }

  return (
    <p>
      {user.name} logged in{' '}
      <button type="button" onClick={handleLogout}>
        logout
      </button>
    </p>
  )
}
