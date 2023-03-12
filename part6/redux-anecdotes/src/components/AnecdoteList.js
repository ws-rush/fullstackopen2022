import { useSelector, useDispatch } from "react-redux"
import { voteFor } from "../reducers/anecdoteReducer"

export default function AnecdoteList() {
    const anecdotes = useSelector(state => {
        if (state.filter === '') {
            return state.anecdots.sort((a, b) => b.votes - a.votes)
        }
        return state.anecdots
          .filter(item => item.content.includes(state.filter))
          .sort((a, b) => b.votes - a.votes)
            
    })
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        dispatch(voteFor(id))
    }

    return (<>
        {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>)
}