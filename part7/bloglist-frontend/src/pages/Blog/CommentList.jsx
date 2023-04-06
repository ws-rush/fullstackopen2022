import { useQuery } from 'react-query'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Box,
} from '@mui/material'
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
      <Box my={2}>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {data.map((comment) => (
                <TableRow key={comment.id}>
                  <TableCell>{comment.content}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  )
}
