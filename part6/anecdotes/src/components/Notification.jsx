import { useDispatch, useSelector } from "react-redux"
import { notificationChange } from "../reducers/notificationReducer"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  const dispatch = useDispatch()

  const notificationText = useSelector(store => store.notification)

  return (
    <div style={style} onClick={() => dispatch(notificationChange('You\'ve clicked'))}>
      {notificationText}
    </div>
  )
}

export default Notification