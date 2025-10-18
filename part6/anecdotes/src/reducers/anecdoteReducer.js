import { createSlice } from "@reduxjs/toolkit"
import anecdotesService from '../services/anecdotes'

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
      const changedAnecdote = action.payload
      
      return sortAnecdotes(state.map(anecdote => anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote))
    }
  }
})

const { setAnecdotes, createAnecdote, addVote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const appendAnecdote = (text) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.createNew(text)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const appendVote = (id, payload) => {
  return async (dispatch) => {
    const changedAnecdote = await anecdotesService.updateAnecdote(id, {...payload, votes: payload.votes + 1})
    dispatch(addVote(changedAnecdote))
  }
}

export default anecdoteSlice.reducer