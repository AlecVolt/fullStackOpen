import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: null, messageStyle: 'notification' },
  reducers: {
    appendNotification(state, action) {
      return action.payload
    },
    removeNotification() {
      return { message: null }
    },
  },
})

const { appendNotification, removeNotification } = notificationSlice.actions

export const setNotification = (message, messageStyle = 'notification', sec = 4) => {
  return (dispatch) => {
    dispatch(appendNotification({ message, messageStyle }))
    setTimeout(() => {
      dispatch(removeNotification())
    }, sec * 1000)
  }
}

export default notificationSlice.reducer
