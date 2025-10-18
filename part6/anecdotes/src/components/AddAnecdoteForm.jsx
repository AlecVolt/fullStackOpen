import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

import anecdotesService from '../services/anecdotes'

const AddAnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()

    const text = event.target.anecdoteText.value
    event.target.anecdoteText.value = ''

    const newText = await anecdotesService.createNew(text)
    
    dispatch(createAnecdote(newText))
    dispatch(setNotification(`You added '${text}'`))
  }

  return (
    <form onSubmit={addAnecdote}>
      <input name='anecdoteText' />
      <button type='submit'>add</button>
    </form>
  )
}

export default AddAnecdoteForm