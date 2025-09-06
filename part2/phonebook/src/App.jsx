import { useState } from "react";

const App = () => {

  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);

  const [ newPerson, setNewPerson ] = useState(
    { name: '', number: '' }
  );

  const [ filter, setFilter ] = useState('');
  const [ filteredPersons, setFilteredPersons ] = useState([]);

  const handleNewNameChange = (event) => {
    setNewPerson({ ...newPerson, name: event.target.value });
  }

  const handleNewNumberChange = (event) => {
    setNewPerson({ ...newPerson, number: event.target.value });
  }

  const handleAddNewPerson = (event) => {
    event.preventDefault();

    if (persons.some(person => person.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook`);
      return;
    }

    if (persons.some(person => person.number === newPerson.number)) {
      alert(`${newPerson.number} is already added to phonebook`);
      return;
    }

    setPersons(persons.concat({ name: newPerson.name, number: newPerson.number, id: persons.length + 1 }));
    setNewPerson({ name: '', number: '' });
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase());
    if (event.target.value === '') {
      setFilteredPersons([]);
      return;
    }
    setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())));
  }

  return (
    <>
      <h1>Phonebook</h1>
      <div>
        Filter shown with: <input onChange={handleFilterChange} value={filter} />
      </div>
      {
        filteredPersons.length > 0 && filteredPersons.map(person => 
          <p key={person.id}>{person.name}: {person.number}</p>
        )
      }

      <h2>Add a new</h2>
      <form onSubmit={handleAddNewPerson}>
        <div>
          Name: <input onChange={handleNewNameChange} value={newPerson.name} />
        </div>
        <div>
          Number: <input onChange={handleNewNumberChange} value={newPerson.number} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {
        persons.map(person => 
          <p key={person.id}>{person.name}: {person.number}</p>
        )
      }
    </>
  )

}

export default App;