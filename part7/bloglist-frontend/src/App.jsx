import { useRef } from 'react'
import { useQuery } from 'react-query'
import { useSelector, useDispatch } from './libs/rush'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import PostForm from './components/PostForm'
import blogService from './services/blogService'
import loginService from './services/loginService'
import { setNotificationWithTimeout } from './reducers/notificationReducer'

function LoginForm({ handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" />
      <input type="password" name="password" />
      <input type="submit" value="login" />
    </form>
  )
}

function Main() {
  const result = useQuery('blogs', blogService.getAll)
  const blogFormRef = useRef()

  if (result.isLoading) {
    return <div>loading...</div>
  }

  if (result.isError) {
    return <div>error: {result.error.message}</div>
  }

  const blogs = [...result.data].sort((a, b) => b.likes - a.likes)

  return (
    <>
      <h2>create new</h2>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <PostForm formRef={blogFormRef} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  )
}

function App() {
  const user = useSelector((state) => state.user)
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

  const handleLogout = () => {
    dispatch({ type: 'user/clearUser' })
  }

  if (!user) {
    return (
      <>
        <h1>Blogs</h1>
        <Notification />
        <LoginForm handleSubmit={handleLogin} />
        <p>Blog app, wusaby-rush 2022</p>
      </>
    )
  }

  return (
    <div>
      <Notification />
      <h1>Blogs</h1>
      <p>
        {user.name} logged in{' '}
        <button type="button" onClick={handleLogout}>
          logout
        </button>
      </p>
      <Main />
    </div>
  )
}

export default App
