import { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./Filter";
import AddNewPersonForm from "./AddNewPersonForm";
import Persons from "./Persons";

const App = () => {

  const [ persons, setPersons ] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => 
        setPersons(response.data)
      );
  }, []);

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

    axios
      .post('http://localhost:3001/persons', newPerson)
      .then(response => 
        setPersons(persons.concat(response.data))
      );

    // setPersons(persons.concat({ name: newPerson.name, number: newPerson.number, id: persons.length + 1 }));
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