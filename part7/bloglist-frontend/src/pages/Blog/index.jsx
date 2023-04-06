import { useParams, Navigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { Button } from '@mui/material'
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
      <Button href={blog.url}>{blog.url}</Button>
      <Vote key={blog.likes} blog={blog} />
      <em>added by {blog.author}</em>
      <h2>comments</h2>
      <CommentList id={id} />
    </>
  )
}
