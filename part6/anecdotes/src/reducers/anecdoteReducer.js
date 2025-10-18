import { createSlice } from "@reduxjs/toolkit"
const sortAnecdotes = (arr) => {
  return arr.sort((a, b) => b.votes - a.votes)
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return sortAnecdotes(action.payload)
    },
    createAnecdote(state, action) {
      return sortAnecdotes([...state, action.payload])
    },
    addVote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      
      return sortAnecdotes(state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote))
    }
  }
})

export const { setAnecdotes, createAnecdote, addVote } = anecdoteSlice.actions
export default anecdoteSlice.reducer