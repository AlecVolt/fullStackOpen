import express, { Response } from 'express';
import { NonSensitivePatient } from '../types';
import patientsService from '../services/patientsService';

const route = express.Router();

route.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientsService.getNonSensitivePatients());
});

export default route;
