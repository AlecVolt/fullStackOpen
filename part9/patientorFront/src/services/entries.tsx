import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { NewEntry } from '../types';

const create = async (id: string, object: NewEntry) => {
  const { data } = await axios.post<NewEntry>(`${apiBaseUrl}/patients/${id}/entries`, object);
  console.log(data);
  return data;
};

export default { create };
