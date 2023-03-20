import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'
import { changeBlog, removeBlog } from '../reducers/blogsReducer'
import blogService from '../services/blogService'

function Blog({ blog }) {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const style = {
    border: '1px solid black',
    padding: '5px',
    margin: '5px',
  }

  const increaseLikesByOne = async () => {
    try {
      const result = await blogService.update(blog.id, {
        likes: blog.likes + 1,
      })
      dispatch(changeBlog(result))
    } catch (exception) {
      dispatch(setNotificationWithTimeout('error updating blog', 'error'))
    }
  }

  const remove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id)
        dispatch(removeBlog(blog.id))
      } catch (exception) {
        console.log(exception)
        dispatch(setNotificationWithTimeout('error removing blog', 'error'))
      }
    }
  }

  return (
    <div className="blog" style={style}>
      <h4>
        {blog.title}
        <button type="button" onClick={() => setVisible(!visible)}>
          {visible ? 'hide' : 'view'}
        </button>
      </h4>
      {visible && (
        <>
          <p>{blog.url}</p>
          <p>
            {blog.likes} likes
            <button type="button" onClick={increaseLikesByOne}>
              like
            </button>
          </p>
          <p>{blog.author}</p>
          <button type="button" onClick={remove}>
            remove
          </button>
        </>
      )}
    </div>
  )
}

export default Blog
