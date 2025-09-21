import Persons from "./Persons";

const Filter = ({ handleFilterChange, filter, filteredPersons,  }) => {
    return (
        <>
            <div>
              Filter shown with: <input onChange={handleFilterChange} value={filter} />
            </div>
            {
              <Persons 
                persons={filteredPersons}
              />
            }
        </>
    )
}

export default Filter;