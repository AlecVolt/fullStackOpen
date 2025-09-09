import { useEffect, useState } from "react";
import BackToMainBtn from "./BackToMainBtn";
import { getCountyByName } from "./services/countries";

const SingleCountry = ({ name, setShownCountryName }) => {
    const [ countryInfo, setCountyInfo ] = useState(null);

    useEffect(() => {
        getCountyByName(name)
            .then(data => setCountyInfo(data));
    }, []);


    return (
        <>
            <BackToMainBtn setShownCountryName={setShownCountryName} />
            {
                countryInfo &&
                <div>
                    <h2>{countryInfo.name.official}</h2>
                    <h3>Common name: {countryInfo.name.common}</h3>
                    <p>Capital: {countryInfo.capital[0]}</p>
                    <p>Area: {countryInfo.area}</p>
                    <p>Population: {countryInfo.population}</p>

                    <h3>Languages</h3>
                    <ul>
                        {
                            Object.values(countryInfo.languages).map(language => 
                                <li key={`${name}-${language}`}>{language}</li>
                            )
                        }
                    </ul>

                    <h3>Currencies</h3>
                    <ul>
                        {
                            Object.values(countryInfo.currencies).map(currency => 
                                <li key={`${name}-${currency.name}`}>{currency.name} {currency.symbol}</li>
                            )
                        }
                    </ul>

                    <div>
                        <img src={countryInfo.flags.png} alt={countryInfo.flags.alt} />
                    </div>
                </div>
            }
        </>
    )
}

export default SingleCountry;