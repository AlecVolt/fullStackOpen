import { useParams } from 'react-router-dom';
import { Diagnosis, Patient } from '../../types';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import EntryView from './EntryView';

const PatientPage = ({ patients, diagnoses }: { patients: Patient[]; diagnoses: Diagnosis[] }) => {
  const id = useParams().id;
  const patient = patients.find((p) => p.id === id);

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
