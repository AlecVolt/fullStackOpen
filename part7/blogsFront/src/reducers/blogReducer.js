import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const sortFn = (arr) => {
  return arr.sort((a, b) => b.votes - a.votes)
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
  },
})

const { setBlogs, createBlog } = blogSlice.actions

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

export default blogSlice.reducer
