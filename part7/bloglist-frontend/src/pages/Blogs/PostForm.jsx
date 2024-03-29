import { useDispatch } from 'react-redux'
import { useMutation, useQueryClient } from 'react-query'
import { Button, Stack, TextField } from '@mui/material'
import { setNotificationWithTimeout } from '../../reducers/notificationReducer'
import useFetcher from '../../hooks/useFetcher'

export default function PostForm({ formRef }) {
  const { create } = useFetcher('blogs')
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const { mutate } = useMutation(create, {
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
      <Stack>
        <TextField type="text" label="title" name="title" /> <br />
        <TextField type="text" label="name" name="author" /> <br />
        <TextField type="text" label="url" name="url" /> <br />
        <Button type="submit" color="primary" variant="contained">
          create
        </Button>
      </Stack>
    </form>
  )
}
