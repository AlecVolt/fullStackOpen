import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogsList'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }

    fetchData()  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password})

      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      console.log('wrong credentials')
    }
  }

  return (
    <>
      {!user && <LoginForm handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />}
      {user && (
        <>
          <h2>Hi, {user.name}!</h2>
          <BlogList blogs={blogs} />
        </>
      )}
    </>
  )
}

export default App