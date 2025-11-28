import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { NewEntry, Patient } from '../types';

const create = async (id: string, object: NewEntry) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients/${id}/entries`, object);
  return data;
};

export default { create };
