import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"

const AddAnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const text = event.target.anecdoteText.value
    event.target.anecdoteText.value = ''
    dispatch(createAnecdote(text))
  }

  return (
    <form onSubmit={addAnecdote}>
      <input name='anecdoteText' />
      <button type='submit'>add</button>
    </form>
  )
}

export default AddAnecdoteForm