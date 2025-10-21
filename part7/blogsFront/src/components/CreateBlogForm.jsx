import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { appendBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const CreateBlogForm = ({ createBlogFormRef }) => {
  const dispatch = useDispatch()

  const initialBlogState = { title: '', author: '', url: '' }
  const [newBlog, setNewBlog] = useState(initialBlogState)

  const handleSubmit = (event) => {
    event.preventDefault()

    try {
      dispatch(appendBlog(newBlog))
      createBlogFormRef.current.toggleIsVisible()
      setNewBlog(initialBlogState)
    } catch {
      dispatch(setNotification('Sorry your blog was not added', 'error'))
    }
  }

  return (
    <>
      <h2>Create new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            title:
            <input
              type="text"
              value={newBlog.title}
              onChange={({ target }) => setNewBlog((prev) => ({ ...prev, title: target.value }))}
            />
          </label>
        </div>
        <div>
          <label>
            author:
            <input
              type="text"
              value={newBlog.author}
              onChange={({ target }) => setNewBlog((prev) => ({ ...prev, author: target.value }))}
            />
          </label>
        </div>
        <div>
          <label>
            url:
            <input
              type="text"
              value={newBlog.url}
              onChange={({ target }) => setNewBlog((prev) => ({ ...prev, url: target.value }))}
            />
          </label>
        </div>
        <button type="submit">add new blog</button>
      </form>
    </>
  )
}

export default CreateBlogForm
