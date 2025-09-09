import { useEffect, useState } from "react";
import BackToMainBtn from "./BackToMainBtn";
import { getCountyByName } from "./services/countries";
import { getWeather } from "./services/weather";

const SingleCountry = ({ name, setShownCountryName }) => {
    const [ countryInfo, setCountyInfo ] = useState(null);
    const [ weatherInfo, setWeatherInfo ] = useState(null);

    useEffect(() => {
        getCountyByName(name)
            .then(data => setCountyInfo(data));
    }, []);

    useEffect(() => {
        console.log('countryInfo');
        if (countryInfo) {
            getWeather(countryInfo.capital[0])
            .then(data => setWeatherInfo(data));
        }
    }, [countryInfo]);    

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

                    <h3>Weather in {countryInfo.capital[0]}</h3>
                    {
                        weatherInfo &&
                        <div>
                            <p>Temperature {weatherInfo.main.temp} Celsius</p>
                            <img src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`} />
                            <p>Wind {weatherInfo.wind.speed} m/s</p>
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default SingleCountry;