import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'My Blog Title',
  author: 'Author Name',
  url: 'https://example.com',
  likes: 5,
  user: {
    name: 'User Name',
    username: 'User Username'
  }
}

let container
let mockHandler
beforeEach(() => {
  mockHandler = jest.fn()
  container = render(<Blog blog={blog} likeBlog={mockHandler} username={blog.user.username} />).container
})

test('shows title and author by default, but not url or likes', async () => {

  expect(container).toHaveTextContent(blog.title)
  expect(container).toHaveTextContent(blog.author)

  const div = container.querySelector('.showWhenToggle')
  expect(div).toHaveStyle('display: none')
  expect(div).toHaveTextContent(blog.url)
  expect(div).toHaveTextContent(`likes ${blog.likes}`)
  expect(div).not.toHaveTextContent(blog.title)
  expect(div).not.toHaveTextContent(blog.author)
})

test('shows url and number of likes after show button clicked', async () => {
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const div = container.querySelector('.showWhenToggle')
  expect(div).not.toHaveStyle('display: none')
})

test('clicking like button twice calls like fn twice', async () => {
  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})