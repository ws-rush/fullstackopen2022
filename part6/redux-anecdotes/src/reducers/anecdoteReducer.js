import { createSlice } from "@reduxjs/toolkit"

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    // in slicers we can mutate states like state.push()
    voteFor(state, action) {
      //console.log(JSON.parse(JSON.stringify(action))) to debug inside `redux/toolkit` rducesrs
      return state.map(item => (item.id !== action.payload.id)? item : {...item, votes: item.votes + 1})
    },
    newAnecdote(state, action) {
      return [...state, {
        id: getId(),
        votes: 0,
        content: action.payload
      }]
    }
  }
})

export default anecdoteSlice.reducer
export const { voteFor, newAnecdote } = anecdoteSlice.actions