import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import loginService from '../services/loginService'
import blogService from '../services/blogService'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'

export default function Login() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const onSubmit = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    try {
      const loggedUser = await loginService.login({ username, password })
      dispatch(setUser(loggedUser))
      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(loggedUser)
      )
      blogService.setToken(loggedUser.token)
      dispatch(setUser(loggedUser))
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
        <input type="text" name="username" />
        <input type="password" name="password" />
        <input type="submit" value="login" />
      </form>
      <p>Blog app, wusaby-rush 2022</p>
    </>
  )
}
