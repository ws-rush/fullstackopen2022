import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
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
    <Box my={2}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>name</TableCell>
              <TableCell align="right">blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell align="right">{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
