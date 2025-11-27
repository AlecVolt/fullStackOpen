import { Button, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { HealthCheckRating, NewEntry } from '../../types';
import entryService from '../../services/entries';
import axios from 'axios';

const AddEntryForm = ({ type, id }: { type: string; id: string }) => {
  const baseInit = {
    type,
    description: '',
    date: '',
    specialist: '',
    diagnosisCodes: undefined,
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

  const [entry, setEntry] = useState<NewEntry>(
    type === 'HealthCheck'
      ? (healthCheckInit as NewEntry)
      : type === 'OccupationalHealthcare'
      ? (occupationalHealthcareInit as NewEntry)
      : type === 'Hospital'
      ? (hospitalInit as NewEntry)
      : (baseInit as NewEntry)
  );

  useEffect(() => {
    setEntry(
      type === 'HealthCheck'
        ? (healthCheckInit as NewEntry)
        : type === 'OccupationalHealthcare'
        ? (occupationalHealthcareInit as NewEntry)
        : type === 'Hospital'
        ? (hospitalInit as NewEntry)
        : (baseInit as NewEntry)
    );
  }, [type]);

  const onCodesChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (typeof event.target.value === 'string') {
      const values = event.target.value.split(', ');
      setEntry((prev) => ({ ...prev, diagnosisCodes: values }));
    }
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
    console.log(entry);
    try {
      const newEntry = await entryService.create(id, entry);
      console.log(newEntry);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <h3>New {type} entry</h3>
      <p>for {id}</p>
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
            placeholder="YYYY-MM-DD"
            fullWidth
            value={entry.date}
            onChange={({ target }) => setEntry((prev) => ({ ...prev, date: target.value }))}
          />
          <TextField
            label="specialist"
            fullWidth
            value={entry.specialist}
            onChange={({ target }) => setEntry((prev) => ({ ...prev, specialist: target.value }))}
          />
          <TextField
            label="diagnosis codes"
            fullWidth
            value={entry.diagnosisCodes?.join(', ')}
            onChange={onCodesChange}
          />
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
                placeholder="YYYY-MM-DD"
                onChange={({ target }) =>
                  setEntry((prev) => ({ ...prev, sickLeave: { ...entry.sickLeave, startDate: target.value } }))
                }
              />
              <TextField
                label="sick leave end date"
                value={entry.sickLeave?.endDate}
                placeholder="YYYY-MM-DD"
                onChange={({ target }) =>
                  setEntry((prev) => ({ ...prev, sickLeave: { ...entry.sickLeave, endDate: target.value } }))
                }
              />
            </>
          ) : entry.type === 'Hospital' ? (
            <>
              <TextField
                label="discharge date"
                value={entry.discharge.date}
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
