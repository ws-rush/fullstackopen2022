import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogService'

// check if user is stored in localStorage
const storedUserJSON = window.localStorage.getItem('loggedBlogsappUser')
let storedUser = null
if (storedUserJSON) {
  storedUser = JSON.parse(storedUserJSON)
}

const userReducer = createSlice({
  name: 'user',
  initialState: storedUser,
  reducers: {
    setUser(state, action) {
      if (action.payload) {
        window.localStorage.setItem(
          'loggedBlogsappUser',
          JSON.stringify(action.payload)
        )
        blogService.setToken(action.payload.token)
      }
      return action.payload
    },
    clearUser() {
      window.localStorage.removeItem('loggedBlogsappUser')
      return null
    },
  },
})

export const { setUser, clearUser } = userReducer.actions
export default userReducer.reducer
