import { useState } from "react";
import Countries from "./Countries";
import { useEffect } from "react";
import { getAll } from "./services/countries";


const App = () => {
  const [ search, setSearch ] = useState(null);
  const [ countries, setCountries ] = useState(null);

  useEffect(() => {

    if (search) {
      getAll()
        .then(data => 
          setCountries(data.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase())))
        )
    }
  }, [search]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  }

  const handleSearch = () => {
    setCountries(countries.filter(country => country.name.common.includes(search)));
  }
  
  return (
    <>
      <div> 
        find countries : <input onChange={handleSearchChange}/>
      </div>
      {
        countries &&
        countries.length > 10 
        ? <p>Too many matches, specify another filter</p>
        : <Countries countries={countries} />
      }
      
    </>
  )
}

export default App;
