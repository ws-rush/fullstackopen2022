import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import blogService from '../services/blogService'

export default function BlogList() {
  const result = useQuery('blogs', blogService.getAll)

  if (result.isLoading) {
    return <div>loading...</div>
  }

  if (result.isError) {
    return <div>error: {result.error.message}</div>
  }

  const style = {
    border: '1px solid black',
    padding: '5px',
    margin: '5px',
  }

  const blogs = [...result.data].sort((a, b) => b.likes - a.likes)
  return (
    <>
      {blogs.map((blog) => (
        // <Blog key={blog.id} blog={blog} />
        <h3 key={blog.id} style={style}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </h3>
      ))}
    </>
  )
}
