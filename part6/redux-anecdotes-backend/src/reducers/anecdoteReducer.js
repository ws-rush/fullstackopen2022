import { createSlice } from "@reduxjs/toolkit"

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    // in slicers we can mutate states like state.push()
    voteFor(state, action) {
      //console.log(JSON.parse(JSON.stringify(action))) to debug inside `redux/toolkit` rducesrs
      return state.map(item => (item.id !== action.payload.id)? item : {...item, votes: item.votes + 1})
    },
    newAnecdote(state, action) {
      state.push({
        id: getId(),
        votes: 0,
        content: action.payload
      })
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  }
})

export const { voteFor, newAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer