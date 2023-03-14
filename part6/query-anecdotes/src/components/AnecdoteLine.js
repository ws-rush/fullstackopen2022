import { useMutation, useQueryClient } from 'react-query'
import anecdoteService from '../services/anecdoteService'
import { useDispatch } from '../libs/rush'
import { setTimedNotification } from '../reducers/notificationReducer'

export default function AnecdoteLine({ anecdote }) {
    const dispatch = useDispatch()
    const queryClient = useQueryClient()
    const { mutate } = useMutation(anecdoteService.update, {
        onSuccess: (newAncedote) => {
            const anecdotes = queryClient.getQueryData('anecdotes')
            queryClient.setQueryData('anecdotes', anecdotes.map(a => a.id === newAncedote.id ? newAncedote : a))
            dispatch(setTimedNotification(`You voted '${newAncedote.content}'`, 5))
        }
    })

    const handleVote = (anecdote) => {
        mutate({ ...anecdote, votes: anecdote.votes + 1})
    }

    return (
        <>
            <div>
            {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
        </>
    )
}