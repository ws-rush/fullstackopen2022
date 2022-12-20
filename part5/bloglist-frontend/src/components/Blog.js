import { useState } from 'react'

const Blog = ({blog, updateLikes, handleRemove}) => {
  const [visible, setVisible] = useState(false)

  const style = {
    border: '1px solid black',
    padding: '5px',
    margin: '5px'
  }

  const increaseLikesByOne = () => {
    updateLikes(blog.id, {likes: blog.likes + 1})
  }

  const remove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      handleRemove(blog.id)
    }
  }

  return (
    <div style={style}>
      <h4>
        {blog.title}
        <button onClick={() => setVisible(!visible)}>{visible? `hide`: `view`}</button>
      </h4>
      {visible &&
      <>
        <p>{blog.url}</p>
        <p>{blog.likes} likes <button onClick={increaseLikesByOne}>like</button></p>
        <p>{blog.author}</p>
        <button onClick={remove}>remove</button>
      </>
      }
    </div>
  )
}

export default Blog