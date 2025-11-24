import z from 'zod';
import { Gender, HealthCheckRating } from './types';
// export const toNewPatient = (object: unknown): NewPatient => {
//   return NewPatientSchema.parse(object);
// };

export const DiagnosisSchema = z.object({
  code: z.string(),
  name: z.string(),
  latin: z.string().optional(),
});

export const BaseEntrySchema = z.object({
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.array(DiagnosisSchema.shape.code).optional(),
});

export const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

export const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string(),
  sickLeave: z.object({ startDate: z.string().date(), endDate: z.string().date() }).optional(),
});

export const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: z.object({ date: z.string().date(), criteria: z.string() }),
});

export const NewEntrySchema = z.discriminatedUnion('type', [
  HealthCheckEntrySchema,
  OccupationalHealthcareEntrySchema,
  HospitalEntrySchema,
]);

export const EntrySchema = z.discriminatedUnion('type', [
  HealthCheckEntrySchema.extend({ id: z.string() }),
  OccupationalHealthcareEntrySchema.extend({ id: z.string() }),
  HospitalEntrySchema.extend({ id: z.string() }),
]);

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.array(EntrySchema),
});

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
