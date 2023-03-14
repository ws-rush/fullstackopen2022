import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = () => axios.get(baseUrl).then(res => res.data)
  
const create = (newObject) => axios.post(baseUrl, { ...newObject, id: getId() }).then(res => res.data)

const update = (newObject) => axios.put(`${baseUrl}/${newObject.id}`, newObject).then(res => res.data)

// const remove = (id) => {
//     const request = axios.delete(`${baseUrl}/${id}`)
//     return request.then(response => response.data)
// }

const anecdoteService = { getAll, create, update }
export default anecdoteService