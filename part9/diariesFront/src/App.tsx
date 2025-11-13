import { useEffect, useState } from 'react';
import './App.css';
import type { DiaryEntry, NotificationData } from './types';
import { getAllDiaries } from './services/diaryService';
import DiariesList from './components/DiariesList';
import NewDiaryForm from './components/NewDiaryForm';
import Notification from './components/Notification';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [notification, setNotification] = useState<NotificationData>({ message: null, style: 'notification' });

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
      <Notification notification={notification} />
      <NewDiaryForm diaries={diaries} setDiaries={setDiaries} setNotification={setNotification} />
      <DiariesList diaries={diaries} />
    </>
  );
};

export default App;
