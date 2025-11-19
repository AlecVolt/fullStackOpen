import patientsData from '../../data/patients';
import { Entry, NewEntry, NewPatient, NonSensitivePatient, Patient } from '../types';
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

const addPatientEntry = (userId: string, entry: NewEntry): Patient => {
  const patient = patientsData.find((p) => p.id === userId) as Patient;
  const newEntry: Entry = {
    ...entry,
    id: uuid(),
  };
  const editedPatient = { ...patient, entries: patient?.entries.concat(newEntry) };
  patientsData.splice(patientsData.indexOf(patient), 1, editedPatient);
  return editedPatient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  getPatientById,
  addPatient,
  addPatientEntry,
};
