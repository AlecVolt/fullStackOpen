import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const sortFn = (arr) => {
  return arr.sort((a, b) => b.likes - a.likes)
}

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    createBlog(state, action) {
      return sortFn([...state, action.payload])
    },
    updateBlog(state, action) {
      const changedBlog = action.payload
      return sortFn(state.map((blog) => (blog.id !== changedBlog.id ? blog : changedBlog)))
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
  },
})

const { setBlogs, createBlog, updateBlog, deleteBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(sortFn(blogs)))
  }
}

export const sortBlogs = (blogs) => {
  return (dispatch) => {
    dispatch(setBlogs(blogs))
  }
}

export const appendBlog = ({ title, author, url }) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create({ title, author, url })
      dispatch(createBlog(newBlog))
      dispatch(setNotification(`A new blog ${newBlog.title} by ${newBlog.author} added`))
    } catch {
      dispatch(setNotification('Sorry your blog was not added', 'error'))
    }
  }
}

export const appendLike = (blog) => {
  return async (dispatch) => {
    const changedBlog = await blogService.update(blog.id, { ...blog, likes: blog.likes + 1 })
    dispatch(updateBlog(changedBlog))
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(deleteBlog(id))
  }
}

export const appendComment = (blog, text) => {
  return async (dispatch) => {
    const changedBlog = await blogService.createComment(blog.id, text)
    dispatch(updateBlog(changedBlog))
  }
}

export default blogSlice.reducer
