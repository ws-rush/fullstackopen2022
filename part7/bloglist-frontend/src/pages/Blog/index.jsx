import { useParams, Navigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import blogService from '../../services/blogService'
import Vote from './Vote'

export default function Blog() {
  const { id } = useParams()
  const { data, isLoading } = useQuery('blog', () => blogService.getOne(id))
  console.log('data', data)

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
      <Vote key={data.likes} blog={data} />
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
