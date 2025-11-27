import { Entry } from '../../types';

import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const EntryInfo = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case 'HealthCheck':
      return (
        <>
          <MonitorHeartIcon />
        </>
      );
    case 'OccupationalHealthcare':
      return (
        <>
          <BusinessCenterIcon /> --- {entry.employerName}
        </>
      );
    case 'Hospital':
      return (
        <>
          <LocalHospitalIcon />
        </>
      );
    default:
      return null;
  }
};

export default EntryInfo;
