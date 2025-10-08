import { useState } from 'react'
import './blog.css'

const Blog = ({ blog, updateLike, user, deleteBlog }) => {
  const [isView, setIsView] = useState(false)
  const buttonLabel = isView ? 'hide' : 'view'
  
  const toggleIsView = () => {
    setIsView(prev => !prev)
  }

  const handleAddLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }

    updateLike(blog.id, updatedBlog)
  }

  const handleDeleteBlog = () => {
    if (confirm(`Are you sure you want to delete the blog "${blog.title}" by ${blog.author}?`)) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div className='blogItem'>
      <p>
        "{blog.title}" by {blog.author}
        <button className='button' onClick={toggleIsView}>{buttonLabel}</button>
      </p> 
      
      {isView && <>
        <p>{blog.url}</p>
        <p>
          likes {blog.likes}
          <button className='button' onClick={handleAddLike}>like</button>
        </p>
        <p>{blog.user?.name}</p>
        {user && blog.user && user.username === blog.user.username && 
          <button className='button' onClick={handleDeleteBlog}>delete blog</button>
        }
      </>}
    </div>  
  )
}

export default Blog