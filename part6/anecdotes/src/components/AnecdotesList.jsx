import { useDispatch, useSelector } from 'react-redux'
import Anecdote from './Anecdote'
import { setNotification } from '../reducers/notificationReducer'
import { appendVote } from '../reducers/anecdoteReducer'

const AnecdotesList = () => {
  const dispatch = useDispatch()
  
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === 'ALL' ) {
      return anecdotes
    }

    return anecdotes.filter(anecdote => anecdote.text.toLowerCase().includes(filter))
  })

  const handleVote = (anecdote) => {
    dispatch(appendVote(anecdote.id, anecdote))
    dispatch(setNotification(`You voted '${anecdote.text}'`, 1))
  }

  return (
    <ul>
      {anecdotes.map(anecdote => (
        <Anecdote 
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => handleVote(anecdote)}
        />
      ))}
    </ul>
  )
}

export default AnecdotesList