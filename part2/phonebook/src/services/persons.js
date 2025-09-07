import axios from "axios";

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
    return axios
        .get(baseUrl)
        .then(response => response.data);
}

const addNewPerson = (payload) => {
    return axios
        .post(baseUrl, payload)
        .then(response => response.data);
}

// const getAll = async () => {
//     const response = await axios.get(baseUrl);
//     return response.data;
// }

export default { getAll, addNewPerson };