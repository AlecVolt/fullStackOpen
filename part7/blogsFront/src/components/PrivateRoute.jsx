import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const user = useSelector((store) => store.user)

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default PrivateRoute
