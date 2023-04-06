import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Button, Stack, TextField } from '@mui/material'
import useAuth from '../hooks/useAuth'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'

export default function Login() {
  const user = useSelector((state) => state.user)
  const { login } = useAuth()
  const dispatch = useDispatch()

  const onSubmit = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    try {
      const loggedUser = await login({ username, password })
      dispatch(
        setNotificationWithTimeout(`welcome ${loggedUser.username}`, 'success')
      )
    } catch (exception) {
      dispatch(
        setNotificationWithTimeout('wrong username or password', 'error')
      )
    }
  }

  if (user) {
    return <Navigate to="/" />
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <Stack spacing={1}>
          <TextField type="text" label="username" name="username" />
          <TextField type="password" label="password" name="password" />
          <Button type="submit" color="primary" variant="contained">
            login
          </Button>
        </Stack>
      </form>
      <p>Blog app, wusaby-rush 2022</p>
    </>
  )
}
