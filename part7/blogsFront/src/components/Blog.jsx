import { useState } from 'react'
import './blog.css'
import { useSelector } from 'react-redux'

const Blog = ({ blog }) => {
  const user = useSelector((store) => store.user)

  const [isView, setIsView] = useState(false)
  const buttonLabel = isView ? 'hide' : 'view'

  const toggleIsView = () => {
    setIsView((prev) => !prev)
  }

  // const updateLike = async (id, updatedBlogObject) => {
  //   try {
  //     const updatedBlog = await blogService.update(id, updatedBlogObject)

  //     setBlogs(sortBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog))))
  //   } catch {
  //     dispatch(setNotification('Sorry blog was not updated', 'error'))
  //   }
  // }

  // const deleteBlog = async (id) => {
  //   try {
  //     await blogService.remove(id)

  //     setBlogs(sortBlogs(blogs.filter((blog) => blog.id !== id)))

  //     dispatch(setNotification('Blog was deleted'))
  //   } catch {
  //     dispatch(setNotification('Sorry blog was not deleted', 'error'))
  //   }
  // }

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
    <div className="blogItem">
      <p>
        "<span className="blogTitle">{blog.title}</span>" by <span className="blogAuthor">{blog.author}</span>
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
