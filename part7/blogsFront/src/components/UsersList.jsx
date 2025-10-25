import { useDispatch, useSelector } from 'react-redux'
import User from './User'
import { sortUsers } from '../reducers/usersReducer'

const UsersList = () => {
  const users = useSelector((store) => store.users)
  const dispatch = useDispatch()

  const sortByBlogsHighest = () => {
    const sortedUsers = [...users].sort((a, b) => b.blogs.length - a.blogs.length)
    dispatch(sortUsers(sortedUsers))
  }

  const sortByBlogsLowest = () => {
    const sortedUsers = [...users].sort((a, b) => a.blogs.length - b.blogs.length)
    dispatch(sortUsers(sortedUsers))
  }

  return (
    <>
      <h2>Users</h2>
      <button type="button" onClick={sortByBlogsHighest}>
        Order by blogs (highest first)
      </button>
      <button type="button" onClick={sortByBlogsLowest}>
        Order by blogs (lowest first)
      </button>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>
              <b>blogs created</b>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </>
  )
}

export default UsersList
