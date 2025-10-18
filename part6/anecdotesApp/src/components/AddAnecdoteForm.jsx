import { useDispatch } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"

import { appendAnecdote } from "../reducers/anecdoteReducer"

const AddAnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()

    const text = event.target.anecdoteText.value
    event.target.anecdoteText.value = ''
    
    dispatch(appendAnecdote(text))
    dispatch(setNotification(`You added '${text}'`, 2))
  }

  return (
    <form onSubmit={addAnecdote}>
      <input name='anecdoteText' />
      <button type='submit'>add</button>
    </form>
  )
}

export default AddAnecdoteForm