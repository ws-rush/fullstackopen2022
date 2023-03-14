import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    // in slicers we can mutate states like state.push()
    updateAnecdote(state, action) {
      return state.map(anecdote => anecdote.id !== action.payload.id ? anecdote : action.payload)

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

export const { updateAnecdote, newAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer

export function initializeAnecdotes() {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export function createAnecdote(content) {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create({
      content,
      votes: 0,
      id: getId()
    })
    dispatch(appendAnecdote(newAnecdote))
  }
}

export function addVote(anecdote) {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(anecdote.id, {...anecdote, votes: anecdote.votes + 1})
    dispatch(updateAnecdote(updatedAnecdote))
  }
}