const AddNewPersonForm = ({ handleAddNewPerson, newPerson, handleNewNameChange, handleNewNumberChange }) => {
    return (
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
    )
}

export default AddNewPersonForm;