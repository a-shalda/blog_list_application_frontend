import blogService from '../services/blogs'
import { useState } from 'react'

const CreateNewBlog = ({ blogs, setBlogs, setMessage, setMessageClassName }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()

    try {
      const blog = await blogService.create({
        title: title, author: author, url: url
      })
      setTitle('')
      setAuthor('')
      setUrl('')
      setBlogs(blogs.concat(blog))
      setMessage(`A new blog ${title} by ${author} added`)
      setMessageClassName('success')
      setTimeout(() => {
        setMessage(null)
      }, 5000)

    } catch {
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage('Invalid blog')
      setMessageClassName('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const createBlog = (event) => {
    event.preventDefault()
    createNote({
      content: newNote,
      important: true
    })

    setNewNote('')
  }


  return (
    <form onSubmit={addBlog}>
      <div>
        title
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={url}
          name="URL"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  )
}

export default CreateNewBlog