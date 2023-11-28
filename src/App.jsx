import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import Blog from './components/Blog'
import CreateNewBlog from './components/CreateNewBlog'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [messageClassName, setMessageClassName] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  // console.log(blogs)


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()

    try {
      const blog = await blogService.create(blogObject)
      const updatedBlog = {
        author: blog.author,
        id: blog.id,
        likes: blog.likes,
        title: blog.title,
        url: blog.url,
        user: {
          name: user.name
        }
      }
      // console.log(blog, updatedBlog)
      setBlogs(blogs.concat(updatedBlog))
      setMessage(`A new blog ${blogObject.title} by ${blogObject.author} added`)
      setMessageClassName('success')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch {
      setMessage('Invalid blog')
      setMessageClassName('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const revokeToken = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification
        message={message}
        messageClassName={messageClassName}
      />

      {user === null &&
        <Togglable buttonLabel='log in'>
          <Login
            setUser={setUser}
            setMessage={setMessage}
            setMessageClassName={setMessageClassName}
          />
        </Togglable>
      }
      {user &&
        <div>
          <p>{user.name} logged in</p>
          <button
            onClick={revokeToken}
          >Log out
          </button>
          <h2>create new</h2>

          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <CreateNewBlog
              addBlog={addBlog}
              blogs={blogs}
              setBlogs={setBlogs}
              setMessage={setMessage}
              setMessageClassName={setMessageClassName}
            />
          </Togglable>

        </div>
      }
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
        />
      )}
    </div>
  )
}

export default App