import { createSlice } from "@reduxjs/toolkit"

const initialState = 'NO'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, action) {
      return `You voted '${action.payload}'`
    },
    removeNotification () {
      return 'NO'
    }
  }
})

export const setNotification = (text, time = 5000) => (dispatch) => {
  dispatch(addNotification(text))
  setTimeout(() => {
    dispatch(removeNotification())
  }, time)
}

export const { addNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer