import express, { Response } from 'express';
import { NonSensitivePatient } from '../types';
import patientsService from '../services/patientsService';
import toNewPatient from '../utils';

const route = express.Router();

route.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientsService.getNonSensitivePatients());
});

route.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default route;
