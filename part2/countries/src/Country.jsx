const Country = ({ name, capital, area, population, languages, flags }) => {
    console.log(languages);
    return (
        <div>
            <h2>{name}</h2>
            <p>Capital: {capital}</p>
            <p>Area: {area}</p>
            <p>Population: {population}</p>

            <h3>Languages</h3>
            <ul>
                {
                    Object.values(languages).map(language => 
                        <li key={`${name}-${language}`}>{language}</li>
                    )
                }
            </ul>
            <div>
                <img src={flags.png} alt={flags.alt} />
            </div>
        </div>
    )
}

export default Country;