import Person from "./Person";

const Persons = ({ persons, handlePersonDelete }) => {
    return (
        <>
            {
                persons.length > 0 &&
                persons.map(person => 
                    <Person 
                        key={person.id} 
                        name={person.name} 
                        number={person.number} 
                        handlePersonDelete={handlePersonDelete}
                        id={person.id}
                    />
                )
            }
        </>
    )
}

export default Persons;