import { useParams } from 'react-router-dom';
import { Patient } from '../../types';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

const PatientPage = ({ patients }: { patients: Patient[] }) => {
  const id = useParams().id;
  const patient = patients.find((p) => p.id === id);

  console.log(patients);
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
    </>
  );
};

export default PatientPage;
