import { useSelector } from "react-redux"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  const notificationText = useSelector(store => store.notification)

  if (notificationText === 'NO') return null

  return (
    <div style={style} >
      {notificationText}
    </div>
  )
}

export default Notification