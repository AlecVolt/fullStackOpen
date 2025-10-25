import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { appendLike, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'
import { BlogContainer, StyledButton } from '../components/StyledComponents'

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
    <BlogContainer>
      <p>
        <Link to={`/blogs/${blog.id}`}>
          "{blog.title}" by {blog.author}
        </Link>

        <StyledButton className="button" onClick={toggleIsView}>
          {buttonLabel}
        </StyledButton>
      </p>
      {isView && (
        <>
          <a className="blogUrl" href={blog.url}>
            {blog.url}
          </a>
          <p className="blogLikes">
            likes <span className="likesNum">{blog.likes}</span>
            <StyledButton className="button" onClick={handleAddLike}>
              like me
            </StyledButton>
          </p>
          <p>comments {blog.comments.length}</p>
          <p className="blogUser">{blog.user?.name}</p>
          {user && blog.user && user.username === blog.user.username && (
            <StyledButton className="button" onClick={handleDeleteBlog}>
              delete blog
            </StyledButton>
          )}
        </>
      )}
    </BlogContainer>
  )
}

export default Blog
