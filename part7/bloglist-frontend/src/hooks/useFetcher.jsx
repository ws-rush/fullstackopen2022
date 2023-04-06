import { useSelector } from 'react-redux'

export default function useFetcher(resource) {
  const tokenData = useSelector((state) => state.user.token)
  const token = `bearer ${tokenData}`
  const baseURL = `/api/${resource}`

  return {
    getAll: async () => {
      console.log(baseURL)
      const response = await fetch(baseURL)
      return response.json()
    },
    getOne: async (id) => {
      const response = await fetch(`${baseURL}/${id}`)
      return response.json()
    },
    create: async (newObject) => {
      const response = await fetch(baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(newObject),
      })

      if (!response.ok)
        throw new Error(`Failed to create blog. (status:  ${response.status})`)

      return response.json()
    },
    update: async ({ id, ...newObject }) => {
      const response = await fetch(`${baseURL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(newObject),
      })

      if (!response.ok)
        throw new Error(`Failed to update blog. (status:  ${response.status})`)

      return response.json()
    },
    remove: async (id) => {
      const response = await fetch(`${baseURL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })

      if (!response.ok)
        throw new Error(`Failed to delete blog. (status:  ${response.status})`)

      return response
    },
  }
}
