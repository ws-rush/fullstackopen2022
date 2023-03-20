import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'
import { useDispatch } from '../libs/rush'
import blogService from '../services/blogService'

function Blog({ blog }) {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const updateBlog = useMutation(blogService.update, {
    onSuccess: (data) => {
      queryClient.setQueryData('blogs', (old) =>
        old.map((oldBlog) => (oldBlog.id === data.id ? data : oldBlog))
      )
      dispatch(setNotificationWithTimeout('vote added'))
    },
    onError: (error) => {
      dispatch(setNotificationWithTimeout(error.message, 'error'))
    },
  })

  const removeBlog = useMutation(blogService.remove, {
    onSuccess: () => {
      queryClient.setQueryData('blogs', (old) =>
        old.filter((oldBlog) => oldBlog.id !== blog.id)
      )
      dispatch(setNotificationWithTimeout('blog removed'))
    },
    onError: (error) => {
      dispatch(setNotificationWithTimeout(error.message, 'error'))
    },
  })

  const style = {
    border: '1px solid black',
    padding: '5px',
    margin: '5px',
  }

  const increaseLikesByOne = async () => {
    updateBlog.mutate({ id: blog.id, likes: blog.likes + 1 })
  }

  const remove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`))
      removeBlog.mutate(blog.id)
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
