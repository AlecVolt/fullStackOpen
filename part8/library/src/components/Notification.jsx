import './notification.css'

const Notification = ({ notification }) => {
  if (notification.message === null) {
    return null
  }

  return <div className={notification.messageStyle}>{notification.message}</div>
}

export default Notification
