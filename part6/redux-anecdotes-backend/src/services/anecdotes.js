import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}
  
const create = async (newObject) => {
    const response = await axios.post(baseUrl, newObject)
    return response.data
}

const update = async (id, newObject) => {
    const response = await axios.put(`${baseUrl}/${id}`, newObject)
    return response.data
}

// const remove = (id) => {
//     const request = axios.delete(`${baseUrl}/${id}`)
//     return request.then(response => response.data)
// }

const anecdoteService = { getAll, create, update }
export default anecdoteService