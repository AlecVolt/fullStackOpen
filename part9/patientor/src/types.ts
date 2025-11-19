import z from 'zod';
import {
  DiagnosisSchema,
  BaseEntrySchema,
  NewPatientSchema,
  HealthCheckEntrySchema,
  OccupationalHealthcareEntrySchema,
  HospitalEntrySchema,
  EntrySchema,
} from './utils';

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type Diagnosis = z.infer<typeof DiagnosisSchema>;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

export type BaseEntry = z.infer<typeof BaseEntrySchema>;
export type HealthCheckEntry = z.infer<typeof HealthCheckEntrySchema>;
export type OccupationalHealthcareEntry = z.infer<typeof OccupationalHealthcareEntrySchema>;
export type HospitalEntry = z.infer<typeof HospitalEntrySchema>;

export type Entry = z.infer<typeof EntrySchema>;

// export type Entry = HealthCheckEntry | OccupationalHealthcareEntry | HospitalEntry;
export type NewEntry = UnionOmit<Entry, 'id'>;

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

// export interface Diagnosis {
//   code: string;
//   name: string;
//   latin?: string;
// }

// export interface NewBaseEntry {
//   description: string;
//   date: string;
//   specialist: string;
//   diagnosisCodes?: Array<Diagnosis['code']>;
// }

// interface HealthCheckEntry extends BaseEntry {
//   type: 'HealthCheck';
//   healthCheckRating: HealthCheckRating;
// }

// type SickLeave = {
//   startDate: string;
//   endDate: string;
// };

// interface OccupationalHealthcareEntry extends BaseEntry {
//   type: 'OccupationalHealthcare';
//   employerName: string;
//   sickLeave?: SickLeave;
// }

// type Discharge = {
//   date: string;
//   criteria: string;
// };

// interface HospitalEntry extends BaseEntry {
//   type: 'Hospital';
//   discharge: Discharge;
// }
