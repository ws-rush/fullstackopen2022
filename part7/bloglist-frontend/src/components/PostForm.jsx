import { useMutation, useQueryClient } from 'react-query'
import { useDispatch } from 'react-redux'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'
import blogService from '../services/blogService'

function PostForm({ formRef }) {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const { mutate } = useMutation(blogService.create, {
    onSuccess: (data) => {
      queryClient.setQueryData('blogs', (old) => [...old, data])
      dispatch(setNotificationWithTimeout(`a new blog ${data.title} added`))
    },
    onError: (error) => {
      dispatch(setNotificationWithTimeout(error.message, 'error'))
    },
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const blogObject = {
      title: e.target.title.value,
      author: e.target.author.value,
      url: e.target.url.value,
    }
    mutate(blogObject)
    formRef.current.toggleVisability()
    e.target.title.value = ''
    e.target.author.value = ''
    e.target.url.value = ''
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
