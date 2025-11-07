import express, { Response } from 'express';
import { NonSensitivePatient } from '../types';
import patientsService from '../services/patientsService';

const route = express.Router();

route.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientsService.getNonSensitivePatients());
});

route.post('/', (req, res) => {
  const { name, dateOfBirth, gender, occupation, ssn } = req.body;
  const newPatient = patientsService.addPatient({
    name,
    dateOfBirth,
    gender,
    occupation,
    ssn,
  });
  res.json(newPatient);
});

export default route;
