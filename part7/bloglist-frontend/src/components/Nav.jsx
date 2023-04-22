import { useNavigate, Link } from 'react-router-dom'
import { AppBar, Button, IconButton, Toolbar } from '@mui/material'
import { useStore } from '../zux'

export default function Nav() {
  const user = useStore('user')
  const navigate = useNavigate()

  const handleLogout = () => {
    user.logout()
    navigate('/login')
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" />
        <Button color="inherit" component={Link} to="/">
          home
        </Button>
        <Button color="inherit" component={Link} to="/users">
          users
        </Button>
        {user ? (
          <>
            <em>{user.name} logged in</em>
            <Button color="inherit" onClick={handleLogout}>
              logout
            </Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}
