import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import PostForm from './components/PostForm'
import blogService from './services/blogService'
import loginService from './services/loginService'
import { setNotificationWithTimeout } from './reducers/notificationReducer'
import { setBlogs } from './reducers/blogsReducer'
import { clearUser, setUser } from './reducers/userReducer'

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
  const blogs = useSelector((state) =>
    [...state.blogs].sort((a, b) => b.likes - a.likes)
  )
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((result) => {
      dispatch(setBlogs(result))
    })
  }, [])

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
      dispatch(setUser(loggedUser))
      e.target.username.value = ''
      e.target.password.value = ''
    } catch (exception) {
      dispatch(
        setNotificationWithTimeout('wrong username or password', 'error')
      )
    }
  }

  const handleLogout = () => {
    dispatch(clearUser())
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
