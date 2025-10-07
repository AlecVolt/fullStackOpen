import { useState } from 'react'
import './blog.css'
const Blog = ({ blog }) => {
  const [isView, setIsView] = useState(false)
  const buttonLabel = isView ? 'hide' : 'view'
  
  const toggleIsView = () => {
    setIsView(prev => !prev)
  }

  return (
    <div className='blogItem'>
      <p>
        "{blog.title}" by {blog.author}
        <button className='button' onClick={toggleIsView}>{buttonLabel}</button>
      </p> 
      
      {isView && <>
        <p>{blog.url}</p>
        <p>likes {blog.likes}</p>
        <p>{blog.user?.name}</p>
      </>}
    </div>  
  )
}

export default Blog