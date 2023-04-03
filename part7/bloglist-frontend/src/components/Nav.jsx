import { useNavigate, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { clearUser } from '../reducers/userReducer'

export default function Nav() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(clearUser())
    navigate('/login')
  }

  return (
    <ul>
      <li>
        <NavLink to="/">blogs</NavLink>
      </li>
      <li>
        <NavLink to="/users">users</NavLink>
      </li>
      {user && (
        <li>
          {user.name} logged in{' '}
          <button type="button" onClick={handleLogout}>
            logout
          </button>
        </li>
      )}
    </ul>
  )
}
