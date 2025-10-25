import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog'

import { sortBlogs } from '../reducers/blogReducer'
import Toggable from './Toggable'
import CreateBlogForm from './CreateBlogForm'
import { useRef } from 'react'

const BlogList = () => {
  const blogs = useSelector((store) => store.blogs)
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch()

  const createBlogFormRef = useRef()

  const sortByLikesHighest = () => {
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
    dispatch(sortBlogs(sortedBlogs))
  }

  const sortByLikesLowest = () => {
    const sortedBlogs = [...blogs].sort((a, b) => a.likes - b.likes)
    dispatch(sortBlogs(sortedBlogs))
  }

  return (
    <>
      <h2>Blogs</h2>

      {user && (
        <div>
          <Toggable buttonLabel="new blog" ref={createBlogFormRef}>
            <CreateBlogForm createBlogFormRef={createBlogFormRef} />
          </Toggable>
        </div>
      )}

      <div className="button-order">
        <button type="button" onClick={sortByLikesHighest}>
          Order by likes (highest first)
        </button>
        <button type="button" onClick={sortByLikesLowest}>
          Order by likes (lowest first)
        </button>
      </div>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  )
}

export default BlogList
