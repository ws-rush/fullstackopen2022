import { useDispatch } from "react-redux"
import { newAnecdote } from "../reducers/anecdoteReducer"

export default function AnecdoteForm() {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(newAnecdote(content))
    }

    return (<>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
            <div><input name='anecdote' /></div>
            <button>create</button>
        </form>
    </>)
}