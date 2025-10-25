import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { appendComment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { StyledButton, StyledInput } from './StyledComponents'

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
        <StyledInput type="text" value={comment} onChange={({ target }) => setComment(target.value)} />
      </label>
      <StyledButton type="submit">Add comment</StyledButton>
    </form>
  )
}

export default NewCommentForm
