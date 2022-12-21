import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event/'
import Blog from './Blog'

const blog = {
  title: 'Component testing is done with react-testing-library',
  author: 'Test Author',
  url: 'https://reactjs.org/docs/testing.html',
  likes: 10
}

test('renders content', () => {
  // first way to test
  render(<Blog blog={blog} />)
  // all of them support regular expressions
  // when use with getBy, it throws an error if it doesn't find the element
  // when use with queryBy, it returns null if it doesn't find the element
  // all of them support All syntax: getAllBy, queryAllBy, etc.
  // screen.getByText('Component testing is done with react-testing-library')
  // screen.getByRole('heading', { name: 'Component testing is done with react-testing-library' })
  // screen.getByPlaceholderText('Component testing is done with react-testing-library')
  // screen.getByDisplayValue('Component testing is done with react-testing-library')
  const element = screen.getByText('Component testing is done with react-testing-library')
  expect(element).toBeDefined()
  // screen.debug() // prints the whole document
  // screen.debug(element) // prints only the element

  // second way to test
  const { container } = render(<Blog blog={blog} />)
  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('Component testing is done with react-testing-library')
})

test('clicking the button calls event handler twice', async () => {
  const mockHandler = jest.fn()
  render(<Blog blog={blog} updateLikes={mockHandler} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  // whats error here?
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)
  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('check if url and likes are not displayed by default', () => {
  const { container } = render(<Blog blog={blog} />)
  const div = container.querySelector('.blog')
  expect(div).not.toHaveTextContent('https://reactjs.org/docs/testing.html')
  expect(div).not.toHaveTextContent('10')
})

test('check if url and likes are displayed after clicking view button', async () => {
  const { container } = render(<Blog blog={blog} />)
  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)
  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('https://reactjs.org/docs/testing.html')
  expect(div).toHaveTextContent('10')
})