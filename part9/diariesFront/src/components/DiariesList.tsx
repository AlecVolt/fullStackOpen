import type { DiaryEntry } from '../types';
import Diary from './Diary';

const DiariesList = ({ diaries }: { diaries: DiaryEntry[] }) => {
  return (
    <div>
      {diaries.map((diary) => (
        <Diary key={diary.id} diary={diary} />
      ))}
    </div>
  );
};

export default DiariesList;
