import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material'
import useFetcher from '../../hooks/useFetcher'

export default function BlogList() {
  const { getAll } = useFetcher('blogs')
  const result = useQuery('blogs', getAll)

  if (result.isLoading) {
    return <div>loading...</div>
  }

  if (result.isError) {
    return <div>error: {result.error.message}</div>
  }

  const blogs = [...result.data].sort((a, b) => b.likes - a.likes)
  return (
    <Box my={2}>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
                <TableCell align="right">{blog.author}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
