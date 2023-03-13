import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setAnecdotes, voteFor } from "../reducers/anecdoteReducer"
import { setNotification, clearNotification } from "../reducers/notificationReducer"
import anecdoteService from "../services/anecdotes"

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
      anecdoteService.getAll().then(anecdotes =>
        dispatch(setAnecdotes(anecdotes))
      )
    }, [])

    const vote = (anecdote) => {
        dispatch(voteFor(anecdote))
        dispatch(setNotification(`you voted for '${anecdote.content}'`))
        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)
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