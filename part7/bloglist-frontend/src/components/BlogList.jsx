import { useQuery } from 'react-query'
import Blog from './Blog'
import blogService from '../services/blogService'

export default function BlogList() {
  const result = useQuery('blogs', blogService.getAll)

  if (result.isLoading) {
    return <div>loading...</div>
  }

  if (result.isError) {
    return <div>error: {result.error.message}</div>
  }

  const blogs = [...result.data].sort((a, b) => b.likes - a.likes)
  return (
    <>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  )
}
