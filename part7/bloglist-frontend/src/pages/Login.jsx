import { useSelector } from 'react-redux'
import { Form, redirect, Navigate } from 'react-router-dom'
import loginService from '../services/loginService'
import blogService from '../services/blogService'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'

async function action({ request, dispatch }) {
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
    dispatch(setNotificationWithTimeout('wrong username or password', 'error'))
    return null
  }
  return redirect('/')
}

function Component() {
  const user = useSelector((state) => state.user)
  if (user) {
    return <Navigate to="/" />
  }

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

export default { Component, action }
