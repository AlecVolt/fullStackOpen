import Blog from './Blog'

const BlogList = ({ blogs, user }) => {
  return (
    <>
      <h2>Blogs</h2>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </>
  )
}

export default BlogList
