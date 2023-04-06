import { useState } from 'react'
import { useMutation } from 'react-query'
import useFetcher from '../../hooks/useFetcher'

export default function Vote({ blog }) {
  const [likes, setLikes] = useState(blog.likes)

  const { update } = useFetcher('blogs')
  const { mutate } = useMutation(update, {
    onSuccess: () => {
      setLikes((prev) => prev + 1)
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
