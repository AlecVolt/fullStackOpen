import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { appendLike, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const SingleBlog = ({ blogs }) => {
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const id = useParams().id
  const blog = blogs.find((b) => b.id === id)

  if (!blog) {
    return null
  }

  const handleAddLike = () => {
    dispatch(appendLike(blog))
  }

  const handleDeleteBlog = () => {
    if (confirm(`Are you sure you want to delete the blog "${blog.title}" by ${blog.author}?`)) {
      try {
        dispatch(removeBlog(blog.id))
        navigate('/blogs')
        dispatch(setNotification(`Blog "${blog.title}" by ${blog.author} was deleted`))
      } catch {
        dispatch(setNotification(`Sorry blog "${blog.title}" by ${blog.author} was not deleted`, 'error'))
      }
    }
  }

  return (
    <>
      <h2>
        "{blog.title}" {blog.author}
      </h2>

      <p className="blogUrl">{blog.url}</p>
      <p className="blogLikes">
        likes <span className="likesNum">{blog.likes}</span>
        <button className="button" onClick={handleAddLike}>
          like me
        </button>
      </p>
      <p className="blogUser">{blog.user?.name}</p>
      {user && blog.user && user.username === blog.user.username && (
        <button className="button" onClick={handleDeleteBlog}>
          delete blog
        </button>
      )}
    </>
  )
}

export default SingleBlog
