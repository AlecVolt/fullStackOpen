import { Diagnosis, Entry } from '../../types';
import EntryInfo from './EntryInfo';
import HealthCheckRatingBar from '../PatientListPage/HealthCheckRatingBar';

const EntryView = ({ entry, diagnoses }: { entry: Entry; diagnoses: Diagnosis[] }) => {
  const findDiagnosis = (code: string): Diagnosis | undefined => {
    const diagnosis = diagnoses.find((d) => d.code === code);
    return diagnosis;
  };

  return (
    <div className="patientsEntryView">
      <p>
        <b>{entry.date}</b> <EntryInfo entry={entry} />
      </p>
      <p>
        <i>{entry.description}</i>
      </p>
      {entry.type === 'HealthCheck' ? <HealthCheckRatingBar rating={entry.healthCheckRating} /> : null}
      {!entry.diagnosisCodes?.length ? null : (
        <ul>
          {entry.diagnosisCodes?.map((c) => (
            <li key={`${entry.id}-${c}`}>
              {c} {findDiagnosis(c)?.name}
            </li>
          ))}
        </ul>
      )}
      {entry.type === 'OccupationalHealthcare' ? (
        entry.sickLeave ? (
          <div>
            <b>Sick leave:</b> from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
          </div>
        ) : null
      ) : null}
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

export default EntryView;
