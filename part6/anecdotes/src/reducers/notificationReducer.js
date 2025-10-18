import { createSlice } from "@reduxjs/toolkit"

const initialState = 'NO'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, action) {
      return action.payload
    },
    removeNotification () {
      return 'NO'
    }
  }
})

const { addNotification, removeNotification } = notificationSlice.actions

export const setNotification = (text, time = 5) => {
  return (dispatch) => {
    dispatch(addNotification(text))
    setTimeout(() => {
      dispatch(removeNotification())
    }, time * 1000)
  }
}

export default notificationSlice.reducer