import { useQuery } from 'react-query'
import useFetcher from '../../hooks/useFetcher'
import PostComment from './PostComment'

export default function CommentList({ id }) {
  const { getAll } = useFetcher(`blogs/${id}/comments`)
  const { data, isLoading } = useQuery('comments', getAll)

  if (isLoading) {
    return <div>loading...</div>
  }

  if (!data) {
    return <p>there is no comments</p>
  }

  return (
    <>
      <PostComment id={id} />
      <ul>
        {data.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </>
  )
}
