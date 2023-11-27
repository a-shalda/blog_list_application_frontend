import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import CreateNewBlog from './components/CreateNewBlog'
import Login from './components/Login'
import blogService from './services/blogs'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [messageClassName, setMessageClassName] = useState('')

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
        <Login
          setUser={setUser}
          setMessage={setMessage}
          setMessageClassName={setMessageClassName}
        />}

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

          <CreateNewBlog
            blogs={blogs}
            setBlogs={setBlogs}
            setMessage={setMessage}
            setMessageClassName={setMessageClassName}
          />

          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App