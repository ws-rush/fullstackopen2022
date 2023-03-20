import { useDispatch } from 'react-redux'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'
import { newBlog } from '../reducers/blogsReducer'
import blogService from '../services/blogService'

function PostForm({ formRef }) {
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const blogObject = {
      title: e.target.title.value,
      author: e.target.author.value,
      url: e.target.url.value,
    }

    try {
      const blog = await blogService.create(blogObject)
      dispatch(newBlog(blog))
      formRef.current.toggleVisability()
      dispatch(
        setNotificationWithTimeout(
          `a new blog ${blog.title} by ${blog.author} added`
        )
      )
    } catch (exception) {
      dispatch(setNotificationWithTimeout('error adding blog', 'error'))
    } finally {
      e.target.title.value = ''
      e.target.author.value = ''
      e.target.url.value = ''
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      title: <input type="text" name="title" /> <br />
      author: <input type="text" name="author" /> <br />
      url: <input type="text" name="url" /> <br />
      <input type="submit" value="create" />
    </form>
  )
}

export default PostForm
