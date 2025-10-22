import { useContext } from 'react'
import { useState } from 'react'
import './blog.css'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import NotificationContext from '../contexts/NotificationContext'
import { removeBlog, updateBlog } from '../requests/blogs'

const Blog = ({ blog, user }) => {
  const [isView, setIsView] = useState(false)
  const buttonLabel = isView ? 'hide' : 'view'
  const toggleIsView = () => {
    setIsView((prev) => !prev)
  }

  const { notificationDispatch } = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const deleteBlogMutation = useMutation({
    mutationFn: removeBlog,
    onSuccess: (id) => {
      queryClient.setQueryData(['blogs'], (old = []) => old.filter((blog) => blog.id !== id))

      notificationDispatch({
        type: 'DELETE',
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
        payload: 'Sorry blog was not deleted',
      })

      setTimeout(() => {
        notificationDispatch({
          type: 'HIDE',
        })
      }, 5000)
    },
  })

  const addLikeMutation = useMutation({
    mutationFn: updateBlog,
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(['blogs'], (old = []) =>
        old.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog))
      )
    },
    onError: () => {
      notificationDispatch({
        type: 'ERROR',
        payload: 'Sorry blog was not updated',
      })

      setTimeout(() => {
        notificationDispatch({
          type: 'HIDE',
        })
      }, 5000)
    },
  })

  const handleAddLike = (blog) => {
    addLikeMutation.mutate({ ...blog, likes: blog.likes + 1 })
  }

  const handleDeleteBlog = () => {
    if (confirm(`Are you sure you want to delete the blog "${blog.title}" by ${blog.author}?`)) {
      deleteBlogMutation.mutate(blog.id)
    }
  }

  return (
    <div className="blogItem">
      <p>
        "<span className="blogTitle">{blog.title}</span>" by{' '}
        <span className="blogAuthor">{blog.author}</span>
        <button className="button" onClick={toggleIsView}>
          {buttonLabel}
        </button>
      </p>
      {isView && (
        <>
          <p className="blogUrl">{blog.url}</p>
          <p className="blogLikes">
            likes <span className="likesNum">{blog.likes}</span>
            <button className="button" onClick={() => handleAddLike(blog)}>
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
