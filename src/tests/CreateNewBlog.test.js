import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import CreateNewBlog from '../components/CreateNewBlog'
import userEvent from '@testing-library/user-event'

test('<CreateNewBlog /> updates parent state and calls onSubmit', async () => {
  const addBlog = jest.fn()
  const user = userEvent.setup()

  render(<CreateNewBlog addBlog={addBlog} />)

  const inputTitle = screen.getByPlaceholderText('Title')
  const inputAuthor = screen.getByPlaceholderText('Author')
  const inputUrl = screen.getByPlaceholderText('URL')

  const sendButton = screen.getByText('Create')

  await user.type(inputTitle, 'testing a Title')
  await user.type(inputAuthor, 'testing a Author')
  await user.type(inputUrl, 'testing a URL')

  await user.click(sendButton)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('testing a Title')
  expect(addBlog.mock.calls[0][0].author).toBe('testing a Author')
  expect(addBlog.mock.calls[0][0].url).toBe('testing a URL')

})