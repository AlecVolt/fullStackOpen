import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Diagnosis, HealthCheckRating, NewEntry } from '../../types';

const AddEntryForm = ({
  type,
  submitNewEntry,
  diagnoses,
}: {
  type: 'HealthCheck' | 'OccupationalHealthcare' | 'Hospital';
  submitNewEntry: (values: NewEntry) => void;
  diagnoses: Diagnosis[];
}) => {
  const baseInit = {
    type,
    description: '',
    date: '',
    specialist: '',
    diagnosisCodes: [],
  };

  interface HealthCheckRatingOption {
    value: HealthCheckRating;
    label: string;
  }

  const healthCheckRatingOptions: HealthCheckRatingOption[] = (
    Object.values(HealthCheckRating) as unknown as HealthCheckRating[]
  )
    .filter((v) => typeof v === 'number')
    .map((v) => ({
      value: v,
      label: HealthCheckRating[v],
    }));

  const healthCheckInit = {
    ...baseInit,
    healthCheckRating: HealthCheckRating.Healthy,
  };

  const occupationalHealthcareInit = {
    ...baseInit,
    employerName: '',
    sickLeave: { startDate: '', endDate: '' },
  };

  const hospitalInit = {
    ...baseInit,
    discharge: { date: '', criteria: '' },
  };

  const setInitEntry = (t: 'HealthCheck' | 'OccupationalHealthcare' | 'Hospital'): NewEntry => {
    switch (t) {
      case 'HealthCheck':
        return healthCheckInit as NewEntry;
      case 'OccupationalHealthcare':
        return occupationalHealthcareInit as NewEntry;
      case 'Hospital':
        return hospitalInit as NewEntry;
      default:
        throw new Error(`Unsupported entry type: ${t}`);
    }
  };

  const [entry, setEntry] = useState<NewEntry>(setInitEntry(type));

  const diagnosisCodesList = diagnoses.map((d) => d.code);

  useEffect(() => {
    setEntry(setInitEntry(type));
  }, [type]);

  const onDiagnosisCodesChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setEntry((prev) => ({
      ...prev,
      diagnosisCodes: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const onHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === 'string') {
      const value = event.target.value;
      const healthCheckRating = Number(value) as HealthCheckRating;
      setEntry((prev) => ({
        ...(prev as Extract<NewEntry, { type: 'HealthCheck' }>),
        healthCheckRating,
      }));
    }
  };

  const addNewEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    submitNewEntry(entry);
  };

  return (
    <>
      <h3>New {type} entry</h3>
      <form onSubmit={addNewEntry}>
        <div>
          <TextField
            label="description"
            fullWidth
            value={entry.description}
            onChange={({ target }) => setEntry((prev) => ({ ...prev, description: target.value }))}
          />
          <TextField
            label="date"
            fullWidth
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={entry.date}
            onChange={({ target }) => setEntry((prev) => ({ ...prev, date: target.value }))}
          />
          <TextField
            label="specialist"
            fullWidth
            value={entry.specialist}
            onChange={({ target }) => setEntry((prev) => ({ ...prev, specialist: target.value }))}
          />

          <FormControl fullWidth>
            <InputLabel id="diagnosis-codes-label">diagnosis codes</InputLabel>
            <Select<string[]>
              labelId="diagnosis-codes-label"
              multiple
              value={entry.diagnosisCodes ?? []}
              onChange={onDiagnosisCodesChange}
              input={<OutlinedInput label="diagnosis codes" />}
              renderValue={(selected) => selected.join(', ')}
            >
              {diagnosisCodesList.map((c) => (
                <MenuItem key={c} value={c}>
                  <Checkbox checked={entry.diagnosisCodes?.includes(c)} />
                  <ListItemText primary={c} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {entry.type === 'HealthCheck' ? (
            <Select
              label="Health Check Rating"
              value={entry.healthCheckRating.toString()}
              onChange={onHealthCheckRatingChange}
            >
              {healthCheckRatingOptions.map((option) => (
                <MenuItem key={option.label} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          ) : entry.type === 'OccupationalHealthcare' ? (
            <>
              <TextField
                label="employer name"
                fullWidth
                value={entry.employerName}
                onChange={({ target }) => setEntry((prev) => ({ ...prev, employerName: target.value }))}
              />
              <TextField
                label="sick leave start date"
                value={entry.sickLeave?.startDate}
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={({ target }) =>
                  setEntry((prev) => ({ ...prev, sickLeave: { ...entry.sickLeave, startDate: target.value } }))
                }
              />
              <TextField
                label="sick leave end date"
                value={entry.sickLeave?.endDate}
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={({ target }) =>
                  setEntry((prev) => ({ ...prev, sickLeave: { ...entry.sickLeave, endDate: target.value } }))
                }
              />
            </>
          ) : entry.type === 'Hospital' ? (
            <>
              <TextField
                label="discharge date"
                type="date"
                value={entry.discharge.date}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={({ target }) =>
                  setEntry((prev) => ({ ...prev, discharge: { ...entry.discharge, date: target.value } }))
                }
              />
              <TextField
                label="discharge criteria"
                value={entry.discharge.criteria}
                onChange={({ target }) =>
                  setEntry((prev) => ({ ...prev, discharge: { ...entry.discharge, criteria: target.value } }))
                }
              />
            </>
          ) : null}
        </div>
        <Button type="submit">Add new entry</Button>
      </form>
    </>
  );
};

export default AddEntryForm;
