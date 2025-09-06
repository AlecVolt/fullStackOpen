import { useState } from "react";
import Filter from "./Filter";
import AddNewPersonForm from "./AddNewPersonForm";
import Persons from "./Persons";

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
      <Filter 
        handleFilterChange={handleFilterChange}
        filter={filter}
        filteredPersons={filteredPersons}
      />

      <h2>Add a new</h2>
      <AddNewPersonForm 
        handleAddNewPerson={handleAddNewPerson}
        newPerson={newPerson}
        handleNewNameChange={handleNewNameChange}
        handleNewNumberChange={handleNewNumberChange}
      />

      <h2>Numbers</h2>
      <Persons 
        persons={persons}
      />
    </>
  )

}

export default App;