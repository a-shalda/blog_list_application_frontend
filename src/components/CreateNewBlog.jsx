import { useState } from 'react'

const CreateNewBlog = ({ addBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = (event) => {
    event.preventDefault()

    addBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={createBlog}>
      <div>
        title
        <input
          type="text"
          id='title'
          value={title}
          name="Title"
          placeholder='Title'
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          type="text"
          id='author'
          value={author}
          name="Author"
          placeholder='Author'
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          type="text"
          id='url'
          value={url}
          name="URL"
          placeholder='URL'
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  )
}

export default CreateNewBlog