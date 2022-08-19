import { useState } from 'react'
import { login as loginService } from '../services/login.js'
import Togglable from './Togglable'
import PropTypes from 'prop-types'

const NO_OP = () => {}

export default function LoginForm ({ setErrorMessage = NO_OP, setMessage = NO_OP, addUser }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService({
        username,
        password
      })

      addUser(user)

      setUsername('')
      setPassword('')

      setErrorMessage(null)
      setMessage('Logged succesfully')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (err) {
      setErrorMessage(
        `Error ${err.response.data.error}`
      )
      setPassword('')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const handleUsernameChange = (e) => setUsername(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)

  return (
    <div>
      <Togglable buttonLabel='Show login'>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={username}
            name='username'
            placeholder='Username'
            onChange={handleUsernameChange}
          /><br />
          <input
            type='password'
            value={password}
            name='password'
            placeholder='Password'
            onChange={handlePasswordChange}
          /><br />
          <button>Login</button>
        </form>
      </Togglable>
    </div>

  )
}

LoginForm.propTypes = {
  addUser: PropTypes.func.isRequired,
  setMessage: PropTypes.func,
  setErrorMessage: PropTypes.func
}
