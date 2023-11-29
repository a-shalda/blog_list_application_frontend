import { useState } from 'react'
import blogService from '../services/blogs'
import BlogContent from './BlogContent'
import PropTypes from 'prop-types'


const Blog = ({ blog, setMessage, setMessageClassName, deleteThisBlog, user }) => {

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
      setMessage('Only logged in users can update blogs')
      setMessageClassName('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const showDelete = (
    user && blog && (user.username === blog.user.name) && <button onClick={() => deleteThisBlog(blog.id, blog.title)}>remove</button>
  )

  // const content = (
  //   !viewBlog ?
  //     <div className='blog'>
  //       <p>{blog.title} by {blog.author} <button onClick={toggleViewBlog}>{buttonLabel}</button></p>
  //     </div> :
  //     <div className='blogView'>
  //       <p>{blog.title} by {blog.author} <button onClick={toggleViewBlog}>{buttonLabel}</button></p>
  //       <p>{blog.url}</p>
  //       <p>Likes: {likes}
  //         <button onClick={addLike}>like</button>
  //       </p>
  //       <p>{blog.user.name}</p>
  //       {showDelete}
  //     </div>
  // )

  // return content

  return <BlogContent
    blog={blog}
    viewBlog={viewBlog}
    toggleViewBlog={toggleViewBlog}
    buttonLabel={buttonLabel}
    likes={likes}
    addLike={addLike}
    showDelete={showDelete}
  />
}

// Blog.propTypes = {
//   deleteThisBlog: PropTypes.func.isRequired,
//   setMessage: PropTypes.func.isRequired,
//   setMessageClassName: PropTypes.func.isRequired,
// }

export default Blog