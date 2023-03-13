import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}
  
const create = async (content) => {
    const newObject = {
        content,
        votes: 0,
        id: getId()
    }
    const response = await axios.post(baseUrl, newObject)
    return response.data
}

// const update = (id, newObject) => {
//     const request = axios.put(`${baseUrl}/${id}`, newObject)
//     return request.then(response => response.data)
// }

// const remove = (id) => {
//     const request = axios.delete(`${baseUrl}/${id}`)
//     return request.then(response => response.data)
// }

const anecdoteService = { getAll, create }
export default anecdoteService