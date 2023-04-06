import { createSlice } from '@reduxjs/toolkit'

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
      }

      return action.payload
    },
    clearUser(state, action) {
      console.log(state, action)
      window.localStorage.removeItem('loggedBlogsappUser')
      return null
    },
  },
})

export default userReducer.reducer
export const { setUser, clearUser } = userReducer.actions
