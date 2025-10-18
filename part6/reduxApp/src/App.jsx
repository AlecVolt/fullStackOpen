// import './App.css'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { initializeNotes } from './reducers/noteReducer'

import NoteForm from './components/NoteForm'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeNotes())
  }, [dispatch])

  return (
    <div>
      <NoteForm />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App