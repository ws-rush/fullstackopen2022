import { Navigate } from 'react-router-dom'
import { Button, Stack, TextField } from '@mui/material'
import { useStore } from '../zux'

export default function Login() {
  const user = useStore('user')
  const notification = useStore('notification')

  const onSubmit = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    try {
      const loggedUser = await user.login({ username, password })
      notification.notify(`welcome ${ loggedUser.username }`)
    } catch (exception) {
      console.log(exception)
      notification.notify('wrong username or password', 'error')
    }
  }

  if (user.state) {
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
