import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogContent from '../components/BlogContent'


const blog = {
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  likes: 52,
  user: { name: 'Alex' }
}

test('the blog\'s URL and number of likes are shown when the view button is clicked', async () => {

  const mockHandler = jest.fn()

  const { container } = render(<BlogContent
    blog={blog}
    viewBlog={true}
    toggleViewBlog={mockHandler}
    buttonLabel={'view'}
    likes={blog.likes}
  />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)

  const div = container.querySelector('.blog')

  expect(div).toHaveTextContent(
    'Go To Statement Considered Harmful'
  )
  expect(div).toHaveTextContent(
    'Edsger W. Dijkstra'
  )
  expect(div).toHaveTextContent(
    'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
  )
  expect(div).toHaveTextContent(
    '52'
  )
})

test('if the like button is clicked twice, the event handler the component received as props is called twice', async () => {

  const mockHandler = jest.fn()

  render(<BlogContent
    blog={blog}
    viewBlog={true}
    addLike={mockHandler}
  />)

  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})