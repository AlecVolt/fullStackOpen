import { useContext } from 'react'
import { useState } from 'react'

import NotificationContext from '../contexts/NotificationContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createBlog } from '../requests/blogs'

const CreateBlogForm = ({ createBlogFormRef }) => {
  const { notificationDispatch } = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const initialBlogState = { title: '', author: '', url: '' }
  const [newBlog, setNewBlog] = useState(initialBlogState)

  const newBlogMutation = useMutation({
    mutationFn: createBlog,
    onMutate: (newBlog) => {
      queryClient.setQueryData(['blogs'], (old = []) => old.concat(newBlog))
      notificationDispatch({
        type: 'NEW',
        payload: {
          title: newBlog.title,
          author: newBlog.author,
        },
      })

      setTimeout(() => {
        notificationDispatch({
          type: 'HIDE',
        })
      }, 5000)
    },
    onError: () => {
      notificationDispatch({
        type: 'ERROR',
        payload: 'Sorry your blog was not added',
      })

      setTimeout(() => {
        notificationDispatch({
          type: 'HIDE',
        })
      }, 5000)
    },
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    newBlogMutation.mutate(newBlog)
    createBlogFormRef.current.toggleIsVisible()
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
