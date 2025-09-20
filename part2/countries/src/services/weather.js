import axios from "axios";

const weatherApiKey = import.meta.env.VITE_WEATHER_KEY;

export const getWeather = (name) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=${weatherApiKey}`;
    
    return axios
        .get(url)
        .then(response => response.data);
}