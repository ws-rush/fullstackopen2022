import { useParams, Navigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import useFetcher from '../../hooks/useFetcher'

export default function User() {
  const { id } = useParams()
  const { getOne } = useFetcher('users')
  const { data, isLoading } = useQuery('users', () => getOne(id))

  if (isLoading) {
    return <div>loading...</div>
  }

  if (!data) {
    return <Navigate to="/404" />
  }

  return (
    <>
      <h1>{data.title}</h1>
      <p>{data.url}</p>
      <p>added by {data.author}</p>
      {/* <h2>comments</h2>
      <ul>
        {data.comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul> */}
    </>
  )
}
