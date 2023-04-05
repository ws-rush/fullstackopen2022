import { useState } from 'react'
import { useMutation } from 'react-query'
import blogService from '../../services/blogService'

export default function Vote({ blog }) {
  const [likes, setLikes] = useState(blog.likes)

  const { mutate } = useMutation(blogService.update, {
    onSuccess: (data) => {
      setLikes((prev) => prev + 1)
      console.log('success', data)
    },
    onError: (error) => {
      console.log('error', error)
    },
  })

  const vote = async () => {
    mutate({ ...blog, likes: likes + 1 })
  }

  return (
    <p>
      {likes} likes
      <button type="button" onClick={vote}>
        like
      </button>
    </p>
  )
}
