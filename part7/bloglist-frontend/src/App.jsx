import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
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
  const [blogs, setBlogs] = useState([])
  console.log(blogs)

  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then((result) => {
      setBlogs(result.sort((a, b) => b.likes - a.likes))
    })
  }, [])

  const addBlog = async (blogObject) => {
    try {
      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))
      blogFormRef.current.toggleVisability()
      dispatch(
        setNotificationWithTimeout(
          `a new blog ${blog.title} by ${blog.author} added`
        )
      )
    } catch (exception) {
      dispatch(setNotificationWithTimeout('error adding blog', 'error'))
    }
  }

  const updateBlog = async (id, blogObject) => {
    try {
      const blog = await blogService.update(id, blogObject)
      const updatedBlogs = blogs
        .map((b) => (b.id === blog.id ? blog : b))
        .sort((a, b) => b.likes - a.likes)
      setBlogs(updatedBlogs)
    } catch (exception) {
      dispatch(setNotificationWithTimeout('error updating blog', 'error'))
    }
  }

  const removeBlog = async (id) => {
    try {
      const notifyMessage = await blogService.remove(id)
      console.log(notifyMessage)
      const updatedBlogs = blogs.filter((b) => b.id !== id)
      setBlogs(updatedBlogs)
    } catch (exception) {
      console.log(exception)
      dispatch(setNotificationWithTimeout('error removing blog', 'error'))
    }
  }

  return (
    <>
      <h2>create new</h2>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <PostForm createBlog={addBlog} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateLikes={updateBlog}
          handleRemove={removeBlog}
        />
      ))}
    </>
  )
}

function App({ storedUser }) {
  const [user, setUser] = useState(storedUser)

  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()
    const username = e.target.username.value
    const password = e.target.password.value
    try {
      const loggedUser = await loginService.login({ username, password })
      setUser(loggedUser)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogsappUser', JSON.stringify(user))
      e.target.username.value = ''
      e.target.password.value = ''
    } catch (exception) {
      dispatch(
        setNotificationWithTimeout('wrong username or password', 'error')
      )
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogsappUser')
    setUser(null)
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

  blogService.setToken(storedUser.token)
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
