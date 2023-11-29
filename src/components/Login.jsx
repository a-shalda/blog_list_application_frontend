import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Login = ({ setUser, setMessage, setMessageClassName }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong credentials')
      setMessageClassName('error')
      setUsername('')
      setPassword('')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          id='username'
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          id='password'
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id="login-button">log in</button>
    </form>
  )
}

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  setMessageClassName: PropTypes.func.isRequired,
}

export default Login