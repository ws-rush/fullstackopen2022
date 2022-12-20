import { useState } from 'react'

const PostForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleSubmit}>
      title: <input type="text" name="title" value={title} onChange={({target}) => setTitle(target.value)} /> <br />
      author: <input type="text" name="author" value={author} onChange={({target}) => setAuthor(target.value)} /> <br />
      url: <input type="text" name="url" value={url} onChange={({target}) => setUrl(target.value)} /> <br />
      <input type="submit" value="create" />
    </form>
  )
}

export default PostForm