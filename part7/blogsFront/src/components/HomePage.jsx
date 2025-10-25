import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../reducers/userReducer'
import { useSelector } from 'react-redux'

const HomePage = () => {
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logoutUser())
  }
  return (
    <>
      <div>
        <h1>Hiiii</h1>
        {/* {user ? <button onClick={handleLogout}>logout</button> : <Link to="login">login</Link>}
        <Link to="/blogs">Blogs</Link> */}
      </div>
    </>
  )
}

export default HomePage
