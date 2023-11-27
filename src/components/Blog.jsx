import { useState } from 'react'

const Blog = ({ blog }) => {

  const [viewBlog, setViewBlog] = useState(false)

  let buttonLabel = ''
  !viewBlog ? buttonLabel='view' : buttonLabel='hide'

  const toggleViewBlog = () => {
    setViewBlog(!viewBlog)
  }

  const content = (
    !viewBlog ? <p>{blog.title} by {blog.author} <button onClick={toggleViewBlog}>{buttonLabel}</button></p> :
      <div className='blogStyle'>
        <p>{blog.title} by {blog.author} <button onClick={toggleViewBlog}>{buttonLabel}</button></p>
        <p>{blog.url}</p>
        <p>Likes: {blog.likes} <button>like</button></p>
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