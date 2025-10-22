import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogsList'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import Toggable from './components/Toggable'

import NotificationContext from './contexts/NotificationContext'
import { useContext } from 'react'
import { getAllBlogs, setToken } from './requests/blogs'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const createBlogFormRef = useRef()
  const { notificationDispatch } = useContext(NotificationContext)

  const blogResult = useQuery({
    queryKey: ['blogs'],
    queryFn: getAllBlogs,
    refetchOnWindowFocus: false,
    retry: 1,
  })

  const sortBlogs = (blogs) => {
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
    return sortedBlogs
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      setToken(user.token)
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
      setToken(user.token)

      notificationDispatch({
        type: 'LOGIN',
        payload: user.name,
      })

      setTimeout(() => {
        notificationDispatch({
          type: 'HIDE',
        })
      }, 5000)
    } catch {
      notificationDispatch({
        type: 'ERROR',
        payload: 'wrong username or password',
      })

      setTimeout(() => {
        notificationDispatch({
          type: 'HIDE',
        })
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
    window.location.reload()
  }

  if (blogResult.isLoading) {
    return <div>Loading...</div>
  }

  if (blogResult.isError) {
    return <div>blogs service not available due to problems in server</div>
  }

  const blogs = sortBlogs(blogResult.data)

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
            <CreateBlogForm createBlogFormRef={createBlogFormRef} />
          </Toggable>
          <BlogList blogs={blogs} user={user} />
        </>
      )}
    </>
  )
}

export default App
