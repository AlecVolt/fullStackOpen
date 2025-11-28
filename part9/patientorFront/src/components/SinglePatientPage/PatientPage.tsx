import { useParams } from 'react-router-dom';
import { Diagnosis, NewEntry, Patient } from '../../types';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import EntryView from './EntryView';
import { Button } from '@mui/material';
import { useState } from 'react';
import AddEntry from './AddEntry';
import entriesService from '../../services/entries';
import axios from 'axios';

const PatientPage = ({ patients, diagnoses }: { patients: Patient[]; diagnoses: Diagnosis[] }) => {
  const id = useParams().id;

  const [patient, setPatient] = useState<Patient | undefined>(patients.find((p) => p.id === id));
  const [isNewEntryFormVisisble, setIsNewEntryFormVisisble] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const changeIsNewEntryFormVisisble = () => {
    setIsNewEntryFormVisisble((prev) => !prev);
  };

  const buttonLabel = isNewEntryFormVisisble ? 'Hide new entry form' : 'Add new entry';

  if (!patient || !id) {
    return <h2>Sorry! Patient is not found</h2>;
  }

  const submitNewEntry = async (values: NewEntry) => {
    try {
      const updatedPatient = await entriesService.create(id, values);
      setPatient(updatedPatient);
      setIsNewEntryFormVisisble(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data) {
          const message =
            'Something went wrong. Error: ' +
            e.response.data.error.map((e: { path: Array<string> }) => ` Invalid '${e.path.join('-')}'`).join('; ');
          console.error(message, e);
          setError(message);
        } else {
          console.error('Unknown axios error', e);
          setError('Unknown axios error');
        }
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

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
      {isNewEntryFormVisisble && id ? <AddEntry submitNewEntry={submitNewEntry} error={error} /> : null}
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
