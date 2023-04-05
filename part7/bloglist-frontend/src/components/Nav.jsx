import { useNavigate, NavLink } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function Nav() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
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
