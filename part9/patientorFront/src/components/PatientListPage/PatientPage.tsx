import { useParams } from 'react-router-dom';
import { Diagnosis, Patient } from '../../types';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

const PatientPage = ({ patients, diagnoses }: { patients: Patient[]; diagnoses: Diagnosis[] }) => {
  const id = useParams().id;
  const patient = patients.find((p) => p.id === id);

  console.log(diagnoses);

  const findDiagnosis = (code: string): Diagnosis | undefined => {
    const diagnosis = diagnoses.find((d) => d.code === code);
    return diagnosis;
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
      <h3>Entries</h3>
      <div>
        {!patient?.entries.length ? (
          <p>-- no entries --</p>
        ) : (
          patient.entries.map((e) => (
            <div key={e.id}>
              <p>
                {e.date} <i>{e.description}</i>
              </p>
              {!e.diagnosisCodes?.length ? null : (
                <ul>
                  {e.diagnosisCodes?.map((c) => (
                    <li key={`${e.id}-${c}`}>
                      {c} {findDiagnosis(c)?.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default PatientPage;
