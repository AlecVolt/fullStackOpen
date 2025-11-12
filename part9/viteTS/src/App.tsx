import React, { useEffect, useState } from 'react';
import './App.css';
import type { Note } from './types';
import { createNote, getAllNotes } from './services/noteService';

function App() {
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState<Note[]>([{ id: '1', content: 'This is a sample note.' }]);

  useEffect(() => {
    getAllNotes().then((data) => setNotes(data));
  });

  const noteCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createNote({ content: newNote }).then((data) => setNotes(notes.concat(data)));
    setNewNote('');
  };

  return (
    <>
      <div>
        <form onSubmit={noteCreation}>
          <label>
            enter note content:
            <input value={newNote} onChange={({ target }) => setNewNote(target.value)} />
          </label>
          <button type="submit">add</button>
        </form>
      </div>
      <div>
        <ul>
          {notes.map((note) => (
            <li key={note.id}>{note.content}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
