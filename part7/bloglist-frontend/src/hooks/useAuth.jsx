import { useSelector, useDispatch } from 'react-redux'
import { clearUser, setUser } from '../reducers/userReducer'

const baseUrl = '/api/auth/login'

export default function useAuth() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  return {
    user,
    login: async (credentials) => {
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      const loggedUser = await response.json()
      dispatch(setUser(loggedUser))
      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(loggedUser)
      )
      return loggedUser
    },
    logout: async () => {
      dispatch(clearUser())
      window.localStorage.removeItem('loggedBlogappUser')
    },
  }
}
