const initialAnecdotes = [
  {
    id: 1,
    text: 'If it hurts, do it more often.',
    votes: 1
  },
  {
    id: 2,
    text: 'Adding manpower to a late software project makes it later!',
    votes: 0
  },
  {
    id: 3,
    text: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    votes: 11
  },
  {
    id: 4,
    text: 'Premature optimization is the root of all evil.',
    votes: 5
  },
  {
    id: 5,
    text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    votes: 5
  },
]

const sortAnecdotes = (arr) => {
  return arr.sort((a, b) => b.votes - a.votes)
}

const anecdoteReducer = (state = [...initialAnecdotes], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return sortAnecdotes([...state, action.payload])
    case 'ADD_VOTE': {
      const id = action.payload.id
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }

      return sortAnecdotes(state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote))
    }

    default:
      return sortAnecdotes(state)
  }
}

const generateId = () => Number(Math.random() * 100000) 

export const createAnecdote = (text) => {
  return {
    type: 'NEW_ANECDOTE',
    payload: {
      text,
      votes: 0,
      id: generateId()
    }
  }
}

export const addVote = (id) => {
  return {
    type: 'ADD_VOTE',
    payload: { id }
  }
}

export default anecdoteReducer