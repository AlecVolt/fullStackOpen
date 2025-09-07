import { useEffect, useState } from "react";
// import axios from "axios";
import Filter from "./Filter";
import Notification from "./Notification";
import AddNewPersonForm from "./AddNewPersonForm";
import Persons from "./Persons";
import personService from "./services/persons";

const App = () => {

  const [ persons, setPersons ] = useState([]);

  const [ message, setMessage ] = useState(null);
  const [ messageStyle, setMessageStyle ] = useState('notification');

  useEffect(() => {
    personService
      .getAll()
      .then(initPersons => setPersons(initPersons));

    // axios
    //   .get('http://localhost:3001/persons')
    //   .then(response => 
    //     setPersons(response.data)
    //   );
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

    const existingPerson = persons.find(person => person.name === newPerson.name || person.number === newPerson.number);

    if (!existingPerson) {
      personService
        .addNewPerson(newPerson)
        .then(returnedPerson => 
          setPersons(persons.concat(returnedPerson))
        );

      setMessageStyle('notification');
      setMessage(`Added ${newPerson.name}: ${newPerson.number}`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);

    } else {
      if (existingPerson.name === newPerson.name) {
        if (!confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
          return;
        }
      }

      if (existingPerson.number === newPerson.number) {
        if (!confirm(`${newPerson.number} is already added to phonebook, rename a contact?`)) {
          return;
        }
      }

      personService
          .updatePerson(existingPerson.id, newPerson)
          .then(returnedPerson => 
            setPersons(persons.map(person => person.id === existingPerson.id ? returnedPerson : person))
          );

      setMessageStyle('notification');
      setMessage(`Contact changed`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }

    setNewPerson({ name: '', number: '' });
  }

  const handlePersonDelete = (id) => {
    if (confirm(`Delete ${persons.find(person => person.id === id).name}?`)) {
      personService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter(person => person.id != id));
        
        setMessageStyle('notification');
        setMessage(`Contact deleted`);

        setTimeout(() => {
          setMessage(null);
        }, 5000);
      })
      .catch(err => {
        setMessageStyle('error');
        setMessage(`Information of ${persons.find(person => person.id === id).name} has already been removed from server`);

        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
      
    }
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

      <Notification message={message} messageStyle={messageStyle} />

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
        handlePersonDelete={handlePersonDelete}
      />
    </>
  )

}

export default App;