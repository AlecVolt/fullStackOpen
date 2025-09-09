import { useState } from "react";
import Countries from "./Countries";
import { useEffect } from "react";
import { getAll } from "./services/countries";
import SingleCountry from "./SingleCountry";


const App = () => {
  const [ search, setSearch ] = useState(null);
  const [ countries, setCountries ] = useState(null);
  const [ shownCountyName, setShownCountryName ] = useState(null);

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

  // const handleSearch = () => {
  //   setCountries(countries.filter(country => country.name.common.includes(search)));
  // }
  
  return (
    <>
      {
        shownCountyName
        ? <SingleCountry 
          name={shownCountyName} 
          setShownCountryName={setShownCountryName}
        />
        : <>
          <div> 
            find countries : <input onChange={handleSearchChange}/>
          </div>
          {
            countries &&
            countries.length > 10 
            ? <p>Too many matches, specify another filter</p>
            : <Countries countries={countries} setShownCountryName={setShownCountryName}/>
          }
        </>
      }      
    </>
  )
}

export default App;
