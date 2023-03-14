import { useQueryClient, useMutation } from 'react-query'
import anecdoteService from '../services/anecdoteService'
import { useDispatch } from '../libs/rush'
import { setTimedNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const { mutate } = useMutation(anecdoteService.create, {
    onSuccess: ({ content }) => {
      queryClient.invalidateQueries('anecdotes')
      dispatch(setTimedNotification(`you created ${content}`, 5))
    },
    onError: (error) => {
      dispatch(setTimedNotification('too short, must be at least 5 characters', 5))
    }
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
