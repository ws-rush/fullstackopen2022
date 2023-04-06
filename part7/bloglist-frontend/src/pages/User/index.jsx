import { useParams, Navigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material'
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
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {data.blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>{blog.title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
