import { useState } from "react";

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]);

  const [newName, setNewName] = useState('');

  const handleNewNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleAddNewPerson = (event) => {
    event.preventDefault();
    setPersons(persons.concat({ name: newName }));
    setNewName('');
  }

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddNewPerson}>
        <div>
          Name: <input onChange={handleNewNameChange} value={newName} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>

      <div>{newName}</div>

      <h2>Numbers</h2>
      {
        persons.map(person => 
          <p key={person.name}>{person.name}</p>
        )
      }
    </>
  )

}

export default App;