import { useParams, Navigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import useFetcher from '../../hooks/useFetcher'

export default function User() {
  const { id } = useParams()
  const { getOne } = useFetcher('users')
  const { data, isLoading } = useQuery('user', () => getOne(id))

  if (isLoading) {
    return <div>loading...</div>
  }

  if (!data.blogs) {
    return <Navigate to="/404" />
  }
  console.log('data', data)

  return (
    <>
      <h1>{data.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {data.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  )
}
