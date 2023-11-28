import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'


test('renders content', () => {
  const blog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 52
  }

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


// test('clicking the button calls event handler once', async () => {
//   const blog = {
//     title: 'Component testing is done with react-testing-library',
//   }

//   const mockHandler = jest.fn()

//   render(
//     <Blog blog={blog} toggleImportance={mockHandler} />
//   )
//   const user = userEvent.setup()
//   const button = screen.getByText('view')
//   await user.click(button)

//   expect(mockHandler.mock.calls).toHaveLength(1)
// })