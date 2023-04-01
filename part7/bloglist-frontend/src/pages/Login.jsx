import { useDispatch } from 'react-redux'
import loginService from '../services/loginService'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'

export default function Component() {
  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()
    const username = e.target.username.value
    const password = e.target.password.value
    try {
      const loggedUser = await loginService.login({ username, password })
      dispatch({ type: 'user/setUser', payload: loggedUser })
      e.target.username.value = ''
      e.target.password.value = ''
    } catch (exception) {
      dispatch(
        setNotificationWithTimeout('wrong username or password', 'error')
      )
    }
  }

  return (
    <>
      <form onSubmit={handleLogin}>
        <input type="text" name="username" />
        <input type="password" name="password" />
        <input type="submit" value="login" />
      </form>
      <p>Blog app, wusaby-rush 2022</p>
    </>
  )
}
