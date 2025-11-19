import z from 'zod';
import { Gender, HealthCheckRating, NewPatient } from './types';

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

export const toNewPatient = (object: unknown): NewPatient => {
  return NewPatientSchema.parse(object);
};

export const DiagnosisSchema = z.object({
  code: z.string(),
  name: z.string(),
  latin: z.string().optional(),
});

export const BaseEntrySchema = z.object({
  id: z.string(),
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.array(DiagnosisSchema.shape.code).optional(),
});

export const HealthCheckEntrySchema = BaseEntrySchema.extend({
  healthCheckRating: z.nativeEnum(HealthCheckRating),
  type: z.string().parse('HealthCheck'),
});

export const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.string().parse('OccupationalHealthcare'),
  employerName: z.string(),
  sickLeave: z.object({ startDate: z.string().date(), endDate: z.string().date() }),
});

export const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.string().parse('Hospital'),
  discharge: z.object({ date: z.string().date(), criteria: z.string() }),
});

export const EntrySchema = z.discriminatedUnion('type', [
  HealthCheckEntrySchema,
  OccupationalHealthcareEntrySchema,
  HospitalEntrySchema,
]);

// const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
//   if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
//     return [] as Array<Diagnosis['code']>;
//   }

//   return object.diagnosisCodes as Array<Diagnosis['code']>;
// };

// export const toBaseEntry = (object: unknown): NewBaseEntry => {
//   if (!object || typeof object !== 'object') {
//     throw new Error('Incorrect or missing data');
//   }
//   if ('description' in object && 'date' in object && 'specialist' in object && 'diagnosisCodes' in object) {
//     return {
//       description: z.string().parse(object.description),
//       date: z.string().parse(object.date),
//       specialist: z.string().parse(object.specialist),
//       diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
//     };
//   }

//   throw new Error('Incorrect data: some fields are missing');
// };
