import { useState } from 'react'
import './blog.css'
import { useDispatch, useSelector } from 'react-redux'
import { appendLike, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch()

  const [isView, setIsView] = useState(false)
  const buttonLabel = isView ? 'hide' : 'view'

  const toggleIsView = () => {
    setIsView((prev) => !prev)
  }

  const handleAddLike = () => {
    dispatch(appendLike(blog))
  }

  const handleDeleteBlog = () => {
    if (confirm(`Are you sure you want to delete the blog "${blog.title}" by ${blog.author}?`)) {
      try {
        dispatch(removeBlog(blog.id))
        dispatch(setNotification(`Blog "${blog.title}" by ${blog.author} was deleted`))
      } catch {
        dispatch(setNotification(`Sorry blog "${blog.title}" by ${blog.author} was not deleted`, 'error'))
      }
    }
  }

  return (
    <div className="blogItem">
      <p>
        <Link to={`/blogs/${blog.id}`}>
          "<span className="blogTitle">{blog.title}</span>" by <span className="blogAuthor">{blog.author}</span>
        </Link>

        <button className="button" onClick={toggleIsView}>
          {buttonLabel}
        </button>
      </p>
      {isView && (
        <>
          <p className="blogUrl">{blog.url}</p>
          <p className="blogLikes">
            likes <span className="likesNum">{blog.likes}</span>
            <button className="button" onClick={handleAddLike}>
              like me
            </button>
          </p>
          <p>comments {blog.comments.length}</p>
          <p className="blogUser">{blog.user?.name}</p>
          {user && blog.user && user.username === blog.user.username && (
            <button className="button" onClick={handleDeleteBlog}>
              delete blog
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default Blog
