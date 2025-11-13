import z from 'zod';
import { NewPatientSchema } from './utils';

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {}

export type NewPatient = z.infer<typeof NewPatientSchema>;

export interface Patient extends NewPatient {
  id: string;
  entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

// export interface Patient {
//   id: string;
//   name: string;
//   dateOfBirth: string;
//   ssn: string;
//   gender: Gender;
//   occupation: string;
// }

// export type NewPatient = Omit<Patient, 'id'>;
