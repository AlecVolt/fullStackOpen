import Blog from "./Blog"

const BlogList = ({ blogs, updateLike }) => {
  return (
    <>
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateLike={updateLike} />
      )}
    </>
  )
}

export default BlogList