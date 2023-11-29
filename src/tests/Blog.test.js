import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'


const blog = {
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  likes: 52,
  user: { name: 'Alex' }
}

test('renders content', () => {

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Go To Statement Considered Harmful'
  )
  expect(div).toHaveTextContent(
    'Edsger W. Dijkstra'
  )
  expect(div).not.toHaveTextContent(
    'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
  )
  expect(div).not.toHaveTextContent(
    '52'
  )
})