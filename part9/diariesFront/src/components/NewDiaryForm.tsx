import React, { useState } from 'react';
import type { DiaryEntry, NewDiaryEntry, NotificationData } from '../types';
import { createDiary } from '../services/diaryService';
import axios from 'axios';

const NewDiaryForm = ({
  diaries,
  setDiaries,
  setNotification,
}: {
  diaries: DiaryEntry[];
  setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
  setNotification: React.Dispatch<React.SetStateAction<NotificationData>>;
}) => {
  const initialEntry = {
    date: '',
    weather: '',
    visibility: '',
    comment: '',
  };

  const [newDiary, setNewDiary] = useState<NewDiaryEntry>(initialEntry);

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const data = await createDiary(newDiary);
      setDiaries([...diaries, data]);
      setNewDiary(initialEntry);
    } catch (error: unknown) {
      let errorMessage = 'Error: ';
      if (axios.isAxiosError(error)) {
        errorMessage += error.response?.data.error.map((e) => '\n Invalid: ' + e.path[0]);
      }
      setNotification({ message: errorMessage, style: 'error' });

      setTimeout(() => {
        setNotification({ message: null, style: 'notification' });
      }, 3000);
    }
  };

  return (
    <>
      <h2>Add new entry</h2>
      <form onSubmit={diaryCreation}>
        <div>
          <label>
            date
            <input
              value={newDiary.date}
              onChange={({ target }) => setNewDiary((prev) => ({ ...prev, date: target.value }))}
            />
          </label>
        </div>
        <div>
          <label>
            visibility
            <input
              value={newDiary.visibility}
              onChange={({ target }) => setNewDiary((prev) => ({ ...prev, visibility: target.value }))}
            />
          </label>
        </div>
        <div>
          <label>
            weather
            <input
              value={newDiary.weather}
              onChange={({ target }) => setNewDiary((prev) => ({ ...prev, weather: target.value }))}
            />
          </label>
        </div>
        <div>
          <label>
            comment
            <input
              value={newDiary.comment}
              onChange={({ target }) => setNewDiary((prev) => ({ ...prev, comment: target.value }))}
            />
          </label>
        </div>
        <button type="submit">add</button>
      </form>
    </>
  );
};

export default NewDiaryForm;
