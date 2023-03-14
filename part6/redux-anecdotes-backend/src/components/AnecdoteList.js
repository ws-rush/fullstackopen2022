import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { initializeAnecdotes, addVote } from "../reducers/anecdoteReducer"
import { setTimedNotification } from "../reducers/notificationReducer"

export default function AnecdoteList() {
    const anecdotes = useSelector(state => {
      if (state.filter === '') {
        return [...state.anecdots].sort((a, b) => b.votes - a.votes) 
      }
      return state.anecdots
        .filter(item => item.content.includes(state.filter))
        .sort((a, b) => b.votes - a.votes) 
    })
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(initializeAnecdotes())
    }, [dispatch])

    const vote = (anecdote) => {
        dispatch(addVote(anecdote))
        dispatch(setTimedNotification(`you voted for '${anecdote.content}'`, 5))
    }

    return (<>
        {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>)
}