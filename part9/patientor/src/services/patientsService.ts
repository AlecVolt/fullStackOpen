import patientsData from '../../data/patients';
import { Entry, NewPatient, NonSensitivePatient, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return patientsData;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  return patientsData.find((p) => p.id === id);
};

const addPatient = (data: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    entries: [] as Entry[],
    ...data,
  };

  patientsData.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  getPatientById,
  addPatient,
};
