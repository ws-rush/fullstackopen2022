import { useQueryClient, useMutation } from 'react-query'
import anecdoteService from '../services/anecdoteService'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation(anecdoteService.create, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    mutate({ content, votes: 0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
