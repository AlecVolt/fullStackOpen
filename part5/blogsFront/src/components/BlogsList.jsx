import Blog from "./Blog"

const BlogList = ({ blogs, setBlogs, updateLike, user, deleteBlog }) => {
  const sortByLikesHighest = () => {
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
    setBlogs(sortedBlogs)
  }

  const sortByLikesLowest = () => {
    const sortedBlogs = [...blogs].sort((a, b) => a.likes - b.likes)
    setBlogs(sortedBlogs)
  }

  return (
    <>
      <h2>Blogs</h2>
      <button type="button" onClick={sortByLikesHighest}>Order by likes (highest first)</button>
      <button type="button" onClick={sortByLikesLowest}>Order by likes (lowest first)</button>

      {blogs.map(blog =>
        <Blog 
          key={blog.id} 
          blog={blog} 
          updateLike={updateLike} 
          user={user} 
          deleteBlog={deleteBlog}
        />
      )}
    </>
  )
}

export default BlogList