import { useQuery } from 'react-query'
import blogService from '../../services/blogService'

export default function Users() {
  const users = useQuery('blogs', blogService.getAll)

  if (users.isLoading) {
    return <div>loading...</div>
  }

  if (users.isError) {
    return <div>error: {users.error.message}</div>
  }
  return (
    <table>
      <tr>
        <td />
        <th>blogs created</th>
      </tr>
      {users.map((user) => (
        <tr key={user.id}>
          <td>{user.name}</td>
          <td>{user.blogs.length}</td>
        </tr>
      ))}
    </table>
  )
}
