import { Alert, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import AddEntryForm from './AddEntryForm';
import { NewEntry } from '../../types';

const AddEntry = ({ submitNewEntry, error }: { submitNewEntry: (values: NewEntry) => void; error?: string }) => {
  const [type, setType] = useState('---Select type---');
  const [isVisisble, setIsVisisble] = useState(false);

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    const value = event.target.value;
    if (typeof value === 'string' && value !== '---Select type---') {
      setType(value);
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
      {isVisisble ? <AddEntryForm type={type} submitNewEntry={submitNewEntry} /> : null}
    </div>
  );
};

export default AddEntry;
