import { useState } from 'react'
import './blog.css'
const Blog = ({ blog, updateLike }) => {
  const [isView, setIsView] = useState(false)
  const buttonLabel = isView ? 'hide' : 'view'
  
  const toggleIsView = () => {
    setIsView(prev => !prev)
  }
  const handleAddLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }

    console.log('updatedBlog:', updatedBlog)

    updateLike(blog.id, updatedBlog)
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
      </>}
    </div>  
  )
}

export default Blog