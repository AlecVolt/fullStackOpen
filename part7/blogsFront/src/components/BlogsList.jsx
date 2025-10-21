import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog'

import { sortBlogs } from '../reducers/blogReducer'

const BlogList = () => {
  const blogs = useSelector((store) => store.blogs)
  const dispatch = useDispatch()

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
      <button type="button" onClick={sortByLikesHighest}>
        Order by likes (highest first)
      </button>
      <button type="button" onClick={sortByLikesLowest}>
        Order by likes (lowest first)
      </button>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  )
}

export default BlogList
