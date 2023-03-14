import { useMutation, useQueryClient } from 'react-query'
import anecdoteService from '../services/anecdoteService'

export default function AnecdoteLine({ anecdote }) {
    const queryClient = useQueryClient()
    const { mutate } = useMutation(anecdoteService.update, {
        onSuccess: () => {
            const anecdotes = queryClient.getQueryData('anecdotes')
            queryClient.setQueryData('anecdotes', anecdotes.map(a => a.id === anecdote.id ? anecdote : a))
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