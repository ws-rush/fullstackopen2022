import blogService from '../services/blogService'

// check if user is stored in localStorage
const storedUserJSON = window.localStorage.getItem('loggedBlogsappUser')
let storedUser = null
if (storedUserJSON) {
  storedUser = JSON.parse(storedUserJSON)
}

// notification reducer
const userReducer = {
  name: 'user',
  initialState: storedUser,
  reducer: (state, action) => {
    switch (action.type) {
    case 'user/setUser':
      if (action.payload) {
        window.localStorage.setItem(
          'loggedBlogsappUser',
          JSON.stringify(action.payload)
        )
        blogService.setToken(action.payload.token)
      }
      return action.payload
    case 'user/clearUser':
      window.localStorage.removeItem('loggedBlogsappUser')
      return null
    default:
      return state
    }
  },
}

export default userReducer
