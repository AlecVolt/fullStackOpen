// import './App.css'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { setNotes } from './reducers/noteReducer'
import noteService from './services/notes'

import NoteForm from './components/NoteForm'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    noteService.getAll().then(notes => dispatch(setNotes(notes)))
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