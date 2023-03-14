import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import AnecdoteLine from './components/AnecdoteLine'
import { useQuery } from 'react-query'
import anecdoteService from './services/anecdoteService'

const App = () => {
  const result = useQuery('anecdotes', anecdoteService.getAll, {
    refetchOnWindowFocus: false,
    retry: 2
  })
  
  if (result.isLoading)
    return <div>Loading...</div>

  if (result.isError)
    return <div>anecdote service not available due to problems in server</div>

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <AnecdoteLine anecdote={anecdote} />
        </div>
      )}
    </div>
  )
}

export default App
