import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import PostForm from './components/PostForm'
import blogService from './services/blogService'
import loginService from './services/loginService'

function LoginForm({
  username,
  password,
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        value={username}
        onChange={handleUsernameChange}
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <input type="submit" value="login" />
    </form>
  )
}

function App() {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    (async () => {
      // sorted by likes in reverse order
      const sortedBlogs = (await blogService.getAll()).sort(
        (a, b) => b.likes - a.likes
      )
      setBlogs(sortedBlogs)
    })()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsappUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      blogService.setToken(loggedUser.token)
      setUser(user)
    }
  }, [])

  // pure function
  const notify = (notifyMessage, type = 'success') => {
    setMessage({ text: notifyMessage, type })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedUser = await loginService.login({ username, password })
      setUser(loggedUser)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogsappUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      notify('wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogsappUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))
      blogFormRef.current.toggleVisability()
      notify(`a new blog ${blog.title} by ${blog.author} added`)
    } catch (exception) {
      notify('error adding blog', 'error')
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
      notify('error updating blog', 'error')
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
      notify('error removing blog', 'error')
    }
  }

  if (user === null) {
    return (
      <div>
        <h1>Blogs</h1>
        {message && <Notification text={message.text} type={message.type} />}
        <LoginForm
          username={username}
          password={password}
          handleSubmit={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
        <p>Blog app, wusaby-rush 2022</p>
      </div>
    )
  }

  return (
    <div>
      {message && <Notification text={message.text} type={message.type} />}
      <h1>Blogs</h1>
      <p>
        {user.name} logged in{' '}
        <button type="button" onClick={handleLogout}>
          logout
        </button>
      </p>
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
    </div>
  )
}

export default App
