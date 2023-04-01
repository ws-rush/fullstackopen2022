import { Form } from 'react-router-dom'

function PostForm({ formRef }) {
  return (
    <Form
      action="post"
      method="/"
      onSubmit={() => formRef.current.toggleVisability()}
    >
      title: <input type="text" name="title" /> <br />
      author: <input type="text" name="author" /> <br />
      url: <input type="text" name="url" /> <br />
      <input type="submit" value="create" />
    </Form>
  )
}

export default PostForm
