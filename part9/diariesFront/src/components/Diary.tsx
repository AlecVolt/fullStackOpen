import type { DiaryEntry } from '../types';

const Diary = ({ diary }: { diary: DiaryEntry }) => {
  return (
    <div>
      <h2>{diary.date}</h2>
      <p>visibility: {diary.visibility}</p>
      <p>weather: {diary.weather}</p>
    </div>
  );
};

export default Diary;
