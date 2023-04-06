import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import useFetcher from '../../hooks/useFetcher'

export default function Users() {
  const { getAll } = useFetcher('users')
  const result = useQuery('users', getAll)

  if (result.isLoading) {
    return <div>loading...</div>
  }

  if (result.isError) {
    return <div>error: {result.error.message}</div>
  }

  const users = result.data

  return (
    <table>
      <tr>
        <td />
        <th>blogs created</th>
      </tr>
      {users.map((user) => (
        <tr key={user.id}>
          <td>
            <Link to={user.id}>{user.name}</Link>
          </td>
          <td>{user.blogs.length}</td>
        </tr>
      ))}
    </table>
  )
}
