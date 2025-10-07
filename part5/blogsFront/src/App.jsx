import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogsList'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const [notification, setNotification] = useState({ message: null, messageStyle: 'notification' })

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

      setNotification({
        message: `Welcome back, ${user.name}`,
        messageStyle: 'notification'
      })
      setTimeout(() => {
        setNotification({ message: null })
      }, 5000)
    } catch {
      setNotification({
        message: 'wrong username or password',
        messageStyle: 'error'
      })
      setTimeout(() => {
        setNotification({ message: null })
      }, 5000)
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

    try {
      const returnedBlog = await blogService.create(newBlogObject)

      setBlogs(blogs.concat(returnedBlog))
      setNewBlog({ title: '', author: '', url: '' })

      setNotification({
        message: `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
        messageStyle: 'notification'
      })
      setTimeout(() => {
        setNotification({ message: null })
      }, 5000)
    } catch {
      setNotification({
        message: 'Sorry your blog was not added',
        messageStyle: 'error'
      })
      setTimeout(() => {
        setNotification({ message: null })
      }, 5000)
    }
  }

  return (
    <>
      <Notification 
        message={notification.message} 
        messageStyle={notification.messageStyle} 
      />

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