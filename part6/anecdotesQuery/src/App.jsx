import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAllAnecdotes, updateAnecdote } from './requests'
import { useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch(action.type) {
    case 'NEW':
      return `anecdote '${action.payload}' added`
    case 'VOTE':
      return `anecdote '${action.payload}' voted`
    case 'NEW_ERR':
      return 'too short anecdote, must have length 5 or more'
    case 'HIDE':
      return false
    default:
      return false
  }
}

const App = () => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, false)

  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAllAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1
  })

  // console.log(JSON.parse(JSON.stringify(result)))

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      queryClient.setQueryData(['anecdotes'], (old = []) => old.map(anecdote => anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote))
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    notificationDispatch({ type: 'VOTE', payload: anecdote.content })
    setTimeout(() => {notificationDispatch({ type: 'HIDE' })}, 5000)
  }

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if(result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data


  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification notification={notification} />
      <AnecdoteForm notificationDispatch={notificationDispatch} />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
