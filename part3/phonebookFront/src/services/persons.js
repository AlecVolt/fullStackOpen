import axios from "axios";

const baseUrl = '/api/persons';

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

const deletePerson = (id) => {
    return axios
        .delete(`${baseUrl}/${id}`)
        .then(response => response.data);
}

const updatePerson = (id, payload) => {
    return axios
        .put(`${baseUrl}/${id}`, payload)
        .then(response => response.data);
}

// const getAll = async () => {
//     const response = await axios.get(baseUrl);
//     return response.data;
// }

export default { getAll, addNewPerson, deletePerson, updatePerson };