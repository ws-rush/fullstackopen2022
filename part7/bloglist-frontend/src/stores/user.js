import { defineStore } from '../zux'

// check if user is stored in localStorage
const storedUser = localStorage.getItem('loggedBlogsappUser')
const appUser = storedUser ? JSON.parse(storedUser) : null

const userStore = defineStore({
  initialState: appUser,
  setters: (set) => ({
    async login(credintials) {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credintials),
      })

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      const loggedUser = await response.json()
      if (loggedUser) {
        window.localStorage.setItem(
          'loggedBlogsappUser',
          JSON.stringify(loggedUser)
        )
      }

      set(loggedUser)
      return loggedUser
    },
    logout() {
      window.localStorage.removeItem('loggedBlogsappUser')
      set(null)
    }
  }),
})

export default userStore
