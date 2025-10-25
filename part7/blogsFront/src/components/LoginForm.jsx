import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

import { loginUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { CenteredPage, StyledButton, StyledInput, Wrapper } from './StyledComponents'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await dispatch(loginUser({ username, password }))
      dispatch(setNotification(`Welcome back, ${user.name}`))
      navigate('/')
      setUsername('')
      setPassword('')
    } catch {
      dispatch(setNotification('wrong username or password', 'error'))
    }
  }

  return (
    <Wrapper>
      <CenteredPage>
        <h2>Hi! I'm a blog list app!</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>
              username
              <StyledInput type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
            </label>
          </div>
          <div>
            <label>
              password
              <StyledInput type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
            </label>
          </div>
          <StyledButton type="submit">login</StyledButton>
        </form>
      </CenteredPage>
    </Wrapper>
  )
}

export default LoginForm
