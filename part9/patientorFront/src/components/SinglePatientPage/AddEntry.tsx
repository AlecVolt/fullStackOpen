import { Alert, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import AddEntryForm from './AddEntryForm';
import { Diagnosis, NewEntry } from '../../types';

type Placeholder = '---Select type---';
type EntryType = 'HealthCheck' | 'OccupationalHealthcare' | 'Hospital';

const AddEntry = ({
  submitNewEntry,
  error,
  diagnoses,
}: {
  submitNewEntry: (values: NewEntry) => void;
  error?: string;
  diagnoses: Diagnosis[];
}) => {
  const [type, setType] = useState<Placeholder | EntryType>('---Select type---');
  const [isVisisble, setIsVisisble] = useState(false);

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    const value = event.target.value;
    if (typeof value === 'string' && value !== '---Select type---') {
      setType(value as EntryType);
      setIsVisisble(true);
    }
  };

  return (
    <div style={{ border: '1px dashed black', padding: 20 }}>
      <InputLabel>Select the type of entry</InputLabel>
      <Select label="type" value={type} onChange={onTypeChange}>
        <MenuItem value={'---Select type---'}>---Select type---</MenuItem>
        <MenuItem value={'HealthCheck'}>Health Check</MenuItem>
        <MenuItem value={'OccupationalHealthcare'}>Occupational Healthcare</MenuItem>
        <MenuItem value={'Hospital'}>Hospital</MenuItem>
      </Select>
      {error && <Alert severity="error">{error}</Alert>}
      {isVisisble && (type === 'HealthCheck' || type === 'OccupationalHealthcare' || type === 'Hospital') ? (
        <AddEntryForm type={type} submitNewEntry={submitNewEntry} diagnoses={diagnoses} />
      ) : null}
    </div>
  );
};

export default AddEntry;
