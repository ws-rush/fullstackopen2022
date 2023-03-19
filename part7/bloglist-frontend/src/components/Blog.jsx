import { useState } from 'react'

function Blog({ blog, updateLikes, handleRemove }) {
  const [visible, setVisible] = useState(false)

  const style = {
    border: '1px solid black',
    padding: '5px',
    margin: '5px',
  }

  const increaseLikesByOne = () => {
    updateLikes(blog.id, { likes: blog.likes + 1 })
  }

  const remove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      handleRemove(blog.id)
    }
  }

  return (
    <div className="blog" style={style}>
      <h4>
        {blog.title}
        <button type="button" onClick={() => setVisible(!visible)}>
          {visible ? 'hide' : 'view'}
        </button>
      </h4>
      {visible && (
        <>
          <p>{blog.url}</p>
          <p>
            {blog.likes} likes
            <button type="button" onClick={increaseLikesByOne}>
              like
            </button>
          </p>
          <p>{blog.author}</p>
          <button type="button" onClick={remove}>
            remove
          </button>
        </>
      )}
    </div>
  )
}

export default Blog
