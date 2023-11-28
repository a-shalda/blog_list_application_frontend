import { useState } from 'react'
import blogService from '../services/blogs'


const Blog = ({ blog }) => {

  let initialLikes = 0
  blog.likes && (initialLikes = blog.likes)

  const [viewBlog, setViewBlog] = useState(false)
  const [likes, setLikes] = useState(initialLikes)

  let buttonLabel = ''
  !viewBlog ? buttonLabel='view' : buttonLabel='hide'

  const toggleViewBlog = () => {
    setViewBlog(!viewBlog)
  }

  const addLike = async () => {

    const updatedBlog = { likes: likes + 1 }

    try {
      await blogService.update(blog.id, updatedBlog)
      setLikes(likes + 1)

    } catch {
      setMessage('Error updating likes')
      setMessageClassName('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const content = (
    !viewBlog ? <p>{blog.title} by {blog.author} <button onClick={toggleViewBlog}>{buttonLabel}</button></p> :
      <div className='blogStyle'>
        <p>{blog.title} by {blog.author} <button onClick={toggleViewBlog}>{buttonLabel}</button></p>
        <p>{blog.url}</p>
        <p>Likes: {likes}
          <button
            onClick={addLike}
          >
            like
          </button>
        </p>
        <p>{blog.user.name}</p>
      </div>
  )

  return (
    <div>
      {content}
    </div>
  )
}
export default Blog