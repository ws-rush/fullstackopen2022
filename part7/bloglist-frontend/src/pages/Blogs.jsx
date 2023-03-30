import { useRef } from 'react'
import BlogList from '../components/BlogList'
import Togglable from '../components/Togglable'
import PostForm from '../components/PostForm'

export default function Blogs() {
  const blogFormRef = useRef()
  return (
    <>
      <h2>create new</h2>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <PostForm formRef={blogFormRef} />
      </Togglable>
      <BlogList />
    </>
  )
}
