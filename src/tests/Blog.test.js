import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'
import userEvent from '@testing-library/user-event'
import BlogContent from '../components/BlogContent'


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

// test('the blog\'s URL and number of likes are shown when the view button is clicked', async () => {

//   const mockHandler = jest.fn()

//   render(<BlogContent
//     blog={blog}
//     viewBlog={true}
//     toggleViewBlog={mockHandler}
//     buttonLabel={'view'}
//     likes={0}
//     addLike={0}
//     showDelete={0}
//   />)


//   const user = userEvent.setup()
//   const button = screen.getByText('view')
//   await user.click(button)

//   screen.debug()

//   expect(mockHandler.mock.calls).toHaveLength(1)
// })