import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const sortFn = (arr) => {
  return arr.sort((a, b) => b.blogs.length - a.blogs.length)
}

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers: (state, action) => {
      return action.payload
    },
  },
})

const { setUsers } = usersSlice.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll()
    dispatch(setUsers(sortFn(users)))
  }
}

export const sortUsers = (users) => {
  return (dispatch) => {
    dispatch(setUsers(users))
  }
}

export default usersSlice.reducer
