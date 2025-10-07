import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogsList'
import CreateBlogForm from './components/CreateBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  useEffect(() => {
    const fetchData = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }

    fetchData()  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')

    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password})

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
    } catch {
      console.error('wrong credentials')
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
    window.location.reload()
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    const newBlogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    }

    const returnedBlog = await blogService.create(newBlogObject)
    setBlogs(blogs.concat(returnedBlog))
    setNewBlog({ title: '', author: '', url: '' })
  }

  return (
    <>
      {!user && 
        <LoginForm 
          handleLogin={handleLogin} 
          username={username} 
          setUsername={setUsername} 
          password={password} 
          setPassword={setPassword} 
        />
      }
      {user && (
        <>
          <h2>Hi, {user.name}!</h2>
          <button onClick={handleLogout}>logout</button>
          <CreateBlogForm 
            handleCreateBlog={handleCreateBlog} 
            newBlog={newBlog} 
            setNewBlog={setNewBlog} 
          />
          <BlogList blogs={blogs} />
        </>
      )}
    </>
  )
}

export default App