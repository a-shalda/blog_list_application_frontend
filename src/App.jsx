import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import Blog from './components/Blog'
import CreateNewBlog from './components/CreateNewBlog'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [messageClassName, setMessageClassName] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


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
            onClick={() => {
              window.localStorage.removeItem('loggedBlogappUser')
              setUser(null)
            }}
          >Log out
          </button>
          <h2>create new</h2>

          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <CreateNewBlog
              blogs={blogs}
              setBlogs={setBlogs}
              setMessage={setMessage}
              setMessageClassName={setMessageClassName}
            />
          </Togglable>

        </div>
      }
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App