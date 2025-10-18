import { createSlice } from "@reduxjs/toolkit"

// const initialAnecdotes = [
//   {
//     id: 1,
//     text: 'If it hurts, do it more often.',
//     votes: 1
//   },
//   {
//     id: 2,
//     text: 'Adding manpower to a late software project makes it later!',
//     votes: 0
//   },
//   {
//     id: 3,
//     text: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//     votes: 11
//   },
//   {
//     id: 4,
//     text: 'Premature optimization is the root of all evil.',
//     votes: 5
//   },
//   {
//     id: 5,
//     text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
//     votes: 5
//   },
// ]

const sortAnecdotes = (arr) => {
  return arr.sort((a, b) => b.votes - a.votes)
}

const generateId = () => Number(Math.random() * 100000)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return sortAnecdotes(action.payload)
    },
    createAnecdote(state, action) {
      const text = action.payload

      return sortAnecdotes([
        ...state, {
          text,
          votes: 0,
          id: generateId()
        }
      ])
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