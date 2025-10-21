import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogsList'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import Toggable from './components/Toggable'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const createBlogFormRef = useRef()

  const dispatch = useDispatch()

  const sortBlogs = (blogs) => {
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
    return sortedBlogs
  }

  useEffect(() => {
    const fetchData = async () => {
      const blogs = await blogService.getAll()
      setBlogs(sortBlogs(blogs))
    }

    fetchData()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)

      dispatch(setNotification(`Welcome back, ${user.name}`))
    } catch {
      dispatch(setNotification('wrong username or password', 'error'))
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
    window.location.reload()
  }

  const createBlog = async (newBlogObject) => {
    try {
      const returnedBlog = await blogService.create(newBlogObject)

      setBlogs(sortBlogs(blogs.concat(returnedBlog)))
      createBlogFormRef.current.toggleIsVisible()

      dispatch(setNotification(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`))
    } catch {
      dispatch(setNotification('Sorry your blog was not added', 'error'))
    }
  }

  const updateLike = async (id, updatedBlogObject) => {
    try {
      const updatedBlog = await blogService.update(id, updatedBlogObject)

      setBlogs(sortBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog))))
    } catch {
      dispatch(setNotification('Sorry blog was not updated', 'error'))
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id)

      setBlogs(sortBlogs(blogs.filter((blog) => blog.id !== id)))

      dispatch(setNotification('Blog was deleted'))
    } catch {
      dispatch(setNotification('Sorry blog was not deleted', 'error'))
    }
  }

  return (
    <>
      <Notification />

      {!user && (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      )}

      {user && (
        <>
          <button onClick={handleLogout}>logout</button>
          <Toggable buttonLabel="new blog" ref={createBlogFormRef}>
            <CreateBlogForm createBlog={createBlog} />
          </Toggable>
          <BlogList blogs={blogs} setBlogs={setBlogs} user={user} updateLike={updateLike} deleteBlog={deleteBlog} />
        </>
      )}
    </>
  )
}

export default App
