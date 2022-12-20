import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import PostForm from './components/PostForm'
import blogService from './services/blogs'
import loginService from './services/login'

const LoginForm = ({ username, password, handleSubmit, handleUsernameChange, handlePasswordChange }) => {
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" value={username} onChange={handleUsernameChange} />
      <input type="password" name="password" value={password} onChange={handlePasswordChange} />
      <input type="submit" value="login" />
    </form>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    (async () => {
      const blogs = await blogService.getAll()
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs( sortedBlogs )
    })()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
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
      const updatedBlogs = blogs.map(b => b.id === blog.id ? blog : b).sort((a, b) => b.likes - a.likes)
      setBlogs(updatedBlogs)
    } catch (exception) {
      notify('error updating blog', 'error')
    }
  }

  const removeBlog = async (id) => {
    try {
      const message = await blogService.remove(id)
      console.log(message)
      const updatedBlogs = blogs.filter(b => b.id !== id)
      setBlogs(updatedBlogs)
    } catch (exception) {
      console.log(exception)
      notify('error removing blog', 'error')
    }
  }

  // pure function
  const notify = (message, type = 'success') => {
    setMessage({ text: message, type })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  if (user === null) {
    return (
      <div>
        {message && <Notification text={message.text} type={message.type} />}
        <LoginForm
          username={username}
          password={password}
          handleSubmit={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)} />
      </div>
    )
  }

  return (
    <div>
      {message && <Notification text={message.text} type={message.type} />}
      <h1>Blogs</h1>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      <h2>create new</h2>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <PostForm createBlog={addBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog
          key={ blog.id}
          blog={ blog }
          updateLikes={updateBlog}
          handleRemove={removeBlog} />
      )}
    </div>
  )
}

export default App
