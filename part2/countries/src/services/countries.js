import axios from 'axios';

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/';

export const getAll = () => {
    return axios
        .get(`${baseUrl}/all`)
        .then(response => response.data);
}