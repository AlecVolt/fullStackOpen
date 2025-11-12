import { useEffect, useState } from 'react';
import './App.css';
import type { DiaryEntry } from './types';
import { getAllDiaries } from './services/diaryService';
import DiariesList from './components/DiariesList';
import NewDiaryForm from './components/NewDiaryForm';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllDiaries();
      setDiaries(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Flight Diaries</h1>
      <NewDiaryForm diaries={diaries} setDiaries={setDiaries} />
      <DiariesList diaries={diaries} />
    </>
  );
};

export default App;
