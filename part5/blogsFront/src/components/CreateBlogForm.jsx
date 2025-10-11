import { useState } from 'react'

const CreateBlogForm = ({ createBlog }) => {
  const initialBlogState = { title: '', author: '', url: '' }
  const [newBlog, setNewBlog] = useState(initialBlogState)

  const handleSubmit = (event) => {
    event.preventDefault()

    createBlog(newBlog)
    setNewBlog(initialBlogState)
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
              onChange={({ target }) => setNewBlog(prev => ({ ...prev, title: target.value }))}
            />
          </label>
        </div>
        <div>
          <label>
            author:
            <input
              type="text"
              value={newBlog.author}
              onChange={({ target }) => setNewBlog(prev => ({ ...prev, author: target.value }))}
            />
          </label>
        </div>
        <div>
          <label>
            url:
            <input
              type="text"
              value={newBlog.url}
              onChange={({ target }) => setNewBlog(prev => ({ ...prev, url: target.value }))}
            />
          </label>
        </div>
        <button type="submit">add new blog</button>
      </form>
    </>
  )
}

export default CreateBlogForm