import Country from "./Country";

const Countries = ({ countries }) => {
    return (
        countries && 
        countries.map(country => 
            <Country 
                key={country.name.common} 
                name={country.name.common}
                capital={country.capital[0]} 
                area={country.area}
                population={country.population}
                languages={country.languages}
                flags={country.flags}
            />
        )
    )
}

export default Countries;