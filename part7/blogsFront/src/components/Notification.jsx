import { useSelector } from 'react-redux'

import './notification.css'

const Notification = () => {
  const { message, messageStyle } = useSelector((store) => store.notification)

  if (message === null) {
    return null
  }

  return <div className={messageStyle}>{message}</div>
}

export default Notification
