// import { useDispatch } from 'react-redux'
import { Form, redirect } from 'react-router-dom'
import loginService from '../services/loginService'
import blogService from '../services/blogService'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'

export const action =
  ({ dispatch }) =>
    async ({ request }) => {
      const data = await request.formData('/login')
      const username = data.get('username')
      const password = data.get('password')
      console.log(username, password)

      try {
        const loggedUser = await loginService.login({ username, password })
        dispatch(setUser(loggedUser))
        window.localStorage.setItem(
          'loggedBlogappUser',
          JSON.stringify(loggedUser)
        )
        blogService.setToken(loggedUser.token)
        dispatch(
          setNotificationWithTimeout(`welcome ${loggedUser.username}`, 'success')
        )
      } catch (exception) {
        dispatch(
          setNotificationWithTimeout('wrong username or password', 'error')
        )
      }
      return redirect('/')
    }

export default function Login() {
  return (
    <>
      <Form method="post" action="/login">
        <input type="text" name="username" />
        <input type="password" name="password" />
        <input type="submit" value="login" />
      </Form>
      <p>Blog app, wusaby-rush 2022</p>
    </>
  )
}
