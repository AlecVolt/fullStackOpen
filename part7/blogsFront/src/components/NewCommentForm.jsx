import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { appendComment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const NewCommentForm = ({ blog }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    try {
      dispatch(appendComment(blog, comment))
      dispatch(setNotification('Comment was added'))
      setComment('')
    } catch {
      dispatch(setNotification('Sorry your comment was not added', 'error'))
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        comment:
        <input type="text" value={comment} onChange={({ target }) => setComment(target.value)} />
      </label>
      <button type="submit">Add comment</button>
    </form>
  )
}

export default NewCommentForm
