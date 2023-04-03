import { useRef } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useDispatch } from 'react-redux'
import BlogList from '../components/BlogList'
import Togglable from '../components/Togglable'
import PostForm from '../components/PostForm'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'
import blogService from '../services/blogService'

async function action({ request }) {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const { mutate } = useMutation(blogService.create, {
    onSuccess: (data) => {
      queryClient.setQueryData('blogs', (old) => [...old, data])
      dispatch(setNotificationWithTimeout(`a new blog ${data.title} added`))
    },
    onError: (error) => {
      dispatch(setNotificationWithTimeout(error.message, 'error'))
    },
  })

  const data = await request.formData('/')
  const blogObject = {
    title: data.get('title'),
    author: data.get('author'),
    url: data.get('url'),
  }
  mutate(blogObject)
}

function Component() {
  const blogFormRef = useRef()
  return (
    <>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <PostForm formRef={blogFormRef} />
      </Togglable>
      <BlogList />
    </>
  )
}

export default { action, Component }
