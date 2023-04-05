import { useRef } from 'react'
import Togglable from './Togglable'
import PostForm from './PostForm'
import BlogList from './BlogList'

export default function Blogs() {
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
