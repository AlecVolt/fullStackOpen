import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        message: `Welcome back, ${action.payload}`,
        messageStyle: 'notification',
      }
    case 'NEW':
      return {
        message: `A new blog ${action.payload.title} by ${action.payload.author} added`,
        messageStyle: 'notification',
      }
    case 'DELETE':
      return {
        message: 'Blog was deleted',
        messageStyle: 'notification',
      }
    case 'ERROR':
      return {
        message: action.payload,
        messageStyle: 'error',
      }
    case 'HIDE':
      return { message: null }
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, {
    message: null,
    messageStyle: 'notification',
  })

  return (
    <NotificationContext.Provider value={{ notification, notificationDispatch }}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
