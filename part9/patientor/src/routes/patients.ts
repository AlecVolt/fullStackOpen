import express, { NextFunction, Request, Response } from 'express';
import { NewPatient, Patient, NewEntry } from '../types';
import patientsService from '../services/patientsService';
import { EntrySchema, NewPatientSchema } from '../utils';
import { ZodError } from 'zod';

const route = express.Router();

// route.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
//   res.send(patientsService.getNonSensitivePatients());
// });

route.get('/', (_req, res: Response<Patient[]>) => {
  res.send(patientsService.getPatients());
});

route.get('/:id', (req: Request, res: Response<Patient>) => {
  const patient = patientsService.getPatientById(req.params.id);
  res.send(patient);
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

route.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<NewPatient>) => {
  const addedPatient = patientsService.addPatient(req.body);
  res.json(addedPatient);
});

route.post('/:userId/entries', (req: Request<{ userId: string }, unknown, NewEntry>, res) => {
  const editedPatient = patientsService.addPatientEntry(req.params.userId, req.body);
  res.json(editedPatient);
});

route.use(errorMiddleware);

export default route;
