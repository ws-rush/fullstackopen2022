import { useMutation, useQueryClient } from 'react-query'
import { Stack, TextField, Button } from '@mui/material'
import useFetcher from '../../hooks/useFetcher'

export default function PostComment({ id }) {
  const commentFetcher = useFetcher(`blogs/${id}/comments`)
  const queryClient = useQueryClient()
  const { mutate } = useMutation(commentFetcher.create, {
    onSuccess: (data) => {
      queryClient.setQueryData('comments', (old) => [...old, data])
    },
    onError: (error) => {
      console.log('error', error)
    },
  })
  const handleSubmit = (e) => {
    const event = e
    event.preventDefault()
    const comment = event.target.comment.value
    mutate({ content: comment })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <TextField type="text" label="comment" name="comment" /> <br />
        <Button type="submit" color="primary" variant="contained">
          add comment
        </Button>
      </Stack>
    </form>
  )
}
