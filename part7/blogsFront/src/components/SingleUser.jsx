import { useParams } from 'react-router-dom'

const SingleUser = ({ users }) => {
  const id = useParams().id
  const user = users.find((u) => u.id === id)

  if (!user) {
    return null
  }

  return (
    <>
      <h2>{user.name}</h2>
      <h3>added blogs --- {user.blogs.length}</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            "{blog.title}" by {blog.author}
          </li>
        ))}
      </ul>
    </>
  )
}

export default SingleUser
