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
    const isContact = persons.some(person => person.name === newName);
    if (isContact) {
      alert(`${newName} is already added to phonebook`);
      setNewName('');
      return;
    }

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