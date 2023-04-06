import { useMutation, useQueryClient } from 'react-query'
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
      <input type="text" name="comment" />
      <input type="submit" value="add comment" />
    </form>
  )
}
