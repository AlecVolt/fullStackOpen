import Filter from "./components/Filter"
import AnecdotesList from "./components/AnecdotesList"
import AddAnecdoteForm from "./components/AddAnecdoteForm"
import Notification from "./components/Notification"

import { useDispatch } from "react-redux"
import { useEffect } from "react"

import { setAnecdotes } from './reducers/anecdoteReducer'
import anecdotesService from './services/anecdotes'

function App() {
  // const showMostVotesAnecdote = () => {
  //   const maxVotes = Math.max(...votes);
  //   return (
  //     <>
  //       <p>{anecdotes[votes.indexOf(maxVotes)]}</p>
  //       <p>has {maxVotes} votes</p>
  //     </>
  //   );
  // }

  const dispatch = useDispatch()

  useEffect(() => {
    anecdotesService.getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  }, [dispatch])

  return (
    <>
      <Notification />

      <h2>Anecdotes</h2>
      <Filter />
      <AnecdotesList />

      <h2>Add new</h2>
      <AddAnecdoteForm />
    </>
  )
}

export default App;
