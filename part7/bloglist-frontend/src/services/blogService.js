const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await fetch(baseUrl)
  return response.json()
}

const create = async (newObject) => {
  const response = await fetch(baseUrl, {
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
}

const update = async ({ id, ...newObject }) => {
  const response = await fetch(`${baseUrl}/${id}`, {
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
}

const remove = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })

  if (!response.ok)
    throw new Error(`Failed to delete blog. (status:  ${response.status})`)

  return response
}

const blogService = { setToken, getAll, create, update, remove }
export default blogService
