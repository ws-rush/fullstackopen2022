import { useParams, Navigate, Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import useFetcher from '../../hooks/useFetcher'
import Vote from './Vote'
import CommentList from './CommentList'

export default function Blog() {
  const { id } = useParams()
  const blogFetcher = useFetcher('blogs')
  const blogResult = useQuery('blog', () => blogFetcher.getOne(id))

  if (blogResult.isLoading) {
    return <div>loading...</div>
  }

  if (!blogResult.data) {
    return <Navigate to="/404" />
  }

  const blog = blogResult.data

  return (
    <>
      <h1>{blog.title}</h1>
      <Link to={blog.url}>{blog.url}</Link>
      <Vote key={blog.likes} blog={blog} />
      <em>added by {blog.author}</em>
      <h2>comments</h2>
      <CommentList id={id} />
    </>
  )
}
