import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import Anecdote from './Anecdote'

const AnecdotesList = () => {
  const dispatch = useDispatch()
  // const anecdotes = useSelector(state => state.anecdotes)
  
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === 'ALL' ) {
      return anecdotes
    }

    return anecdotes.filter(anecdote => anecdote.text.toLowerCase().includes(filter))
  })

  return (
    <ul>
      {anecdotes.map(anecdote => (
        <Anecdote 
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => dispatch(addVote(anecdote.id))}
        />
      ))}
    </ul>
  )
}

export default AnecdotesList