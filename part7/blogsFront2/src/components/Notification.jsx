import { useContext } from 'react'
import './notification.css'
import NotificationContext from '../contexts/NotificationContext'

const Notification = () => {
  const { notification } = useContext(NotificationContext)
  const { message, messageStyle } = notification
  if (message === null) {
    return null
  }

  return <div className={messageStyle}>{message}</div>
}

export default Notification
