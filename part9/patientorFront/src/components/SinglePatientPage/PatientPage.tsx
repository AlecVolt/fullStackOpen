import { useParams } from 'react-router-dom';
import { Diagnosis, Patient } from '../../types';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import EntryView from './EntryView';
import { Button } from '@mui/material';
import { useState } from 'react';
import AddEntry from './AddEntry';

const PatientPage = ({ patients, diagnoses }: { patients: Patient[]; diagnoses: Diagnosis[] }) => {
  const id = useParams().id;
  const patient = patients.find((p) => p.id === id);

  const [isNewEntryFormVisisble, setIsNewEntryFormVisisble] = useState(false);

  const changeIsNewEntryFormVisisble = () => {
    setIsNewEntryFormVisisble((prev) => !prev);
  };

  const buttonLabel = isNewEntryFormVisisble ? 'Hide new entry form' : 'Add new entry';

  return (
    <>
      <h2>
        {patient?.name}{' '}
        {patient?.gender === 'female' ? <FemaleIcon /> : patient?.gender === 'male' ? <MaleIcon /> : null}
      </h2>
      <div>
        <p>ssh: {patient?.ssn}</p>
        <p>occupation: {patient?.occupation}</p>
      </div>
      <Button onClick={changeIsNewEntryFormVisisble}>{buttonLabel}</Button>
      {isNewEntryFormVisisble && id ? <AddEntry id={id} /> : null}
      <h3>Entries</h3>
      <div>
        {!patient?.entries.length ? (
          <p>-- no entries --</p>
        ) : (
          patient.entries.map((entry) => <EntryView key={entry.id} entry={entry} diagnoses={diagnoses} />)
        )}
      </div>
    </>
  );
};

export default PatientPage;
