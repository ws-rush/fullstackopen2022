import { useDispatch } from 'react-redux'
import { useMutation, useQueryClient } from 'react-query'
import { setNotificationWithTimeout } from '../../reducers/notificationReducer'
import blogService from '../../services/blogService'

export default function PostForm({ formRef }) {
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

  const handleSubmit = (e) => {
    const event = e
    event.preventDefault()
    const blogObject = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
    }
    mutate(blogObject)
    formRef.current.toggleVisability()
  }

  return (
    <form method="post" action="/" onSubmit={handleSubmit}>
      title: <input type="text" name="title" /> <br />
      author: <input type="text" name="author" /> <br />
      url: <input type="text" name="url" /> <br />
      <input type="submit" value="create" />
    </form>
  )
}
