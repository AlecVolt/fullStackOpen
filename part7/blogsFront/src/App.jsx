import { useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogsList'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import Toggable from './components/Toggable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, logoutUser } from './reducers/userReducer'
import { Link, Route, Routes, Navigate, useNavigate, useMatch } from 'react-router-dom'
import HomePage from './components/HomePage'
import PrivateRoute from './components/PrivateRoute'
import UsersList from './components/UsersList'
import { initializeUsers } from './reducers/usersReducer'
import SingleUser from './components/SingleUser'

const App = () => {
  const createBlogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const user = useSelector((store) => store.user)

  const users = useSelector((store) => store.users)

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <>
      <Notification />

      <div>
        <Link to="/">Home</Link>
        {user ? <button onClick={handleLogout}>logout</button> : <Link to="login">login</Link>}
        <Link to="/blogs">Blogs</Link>
        <Link to="/users">Users</Link>
      </div>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/:id" element={<SingleUser users={users} />} />
      </Routes>

      {/* {!user && <LoginForm />} */}

      {/* {user && (
        <>
          <div>
            <h3>Navigation</h3>
            <Link to="/">Home</Link>
          </div>
          <Toggable buttonLabel="new blog" ref={createBlogFormRef}>
            <CreateBlogForm createBlogFormRef={createBlogFormRef} />
          </Toggable>
          <BlogList />
        </>
      )} */}
    </>
  )
}

export default App
