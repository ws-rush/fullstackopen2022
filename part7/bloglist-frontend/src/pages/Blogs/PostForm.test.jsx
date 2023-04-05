import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import PostForm from './PostForm'

test('<PostForm /> updates parent state and calls onSubmit', async () => {
  const addBlog = jest.fn()
  const user = userEvent.setup()

  render(<PostForm createBlog={addBlog} />)

  const input = screen.getAllByRole('textbox')
  const sendButton = screen.getByText('create') // see: getByPlaceHolderText

  await user.type(input[0], 'testing a form...')
  await user.type(input[1], 'I am the author...')
  await user.type(input[2], 'test-url...')
  await user.click(sendButton)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('testing a form...')
})
