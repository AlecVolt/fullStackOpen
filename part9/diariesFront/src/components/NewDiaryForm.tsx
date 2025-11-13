import React, { useState } from 'react';
import type { ApiAxiosError, DiaryEntry, NewDiaryEntry, NotificationData } from '../types';
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
      let errorMessage = 'Error:';
      if (axios.isAxiosError(error)) {
        const errors = error.response?.data.error as ApiAxiosError[];
        errorMessage += errors.map((e) => ` Invalid '${e.path[0]}'`);
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
            <input type="date" onChange={({ target }) => setNewDiary((prev) => ({ ...prev, date: target.value }))} />
          </label>
        </div>
        <div>
          <label>
            visibility
            <label>
              <input
                type="radio"
                name="visibility"
                value="great"
                onChange={({ target }) => setNewDiary((prev) => ({ ...prev, visibility: target.value }))}
              />
              great
            </label>
            <label>
              <input
                type="radio"
                name="visibility"
                value="good"
                onChange={({ target }) => setNewDiary((prev) => ({ ...prev, visibility: target.value }))}
              />
              good
            </label>
            <label>
              <input
                type="radio"
                name="visibility"
                value="ok"
                onChange={({ target }) => setNewDiary((prev) => ({ ...prev, visibility: target.value }))}
              />
              ok
            </label>
            <label>
              <input
                type="radio"
                name="visibility"
                value="poor"
                onChange={({ target }) => setNewDiary((prev) => ({ ...prev, visibility: target.value }))}
              />
              poor
            </label>
          </label>
        </div>
        <div>
          <label>
            weather
            <label>
              <input
                type="radio"
                value="sunny"
                onChange={({ target }) => setNewDiary((prev) => ({ ...prev, weather: target.value }))}
              />
              sunny
            </label>
            <label>
              <input
                type="radio"
                value="rainy"
                onChange={({ target }) => setNewDiary((prev) => ({ ...prev, weather: target.value }))}
              />
              rainy
            </label>
            <label>
              <input
                type="radio"
                value="cloudy"
                onChange={({ target }) => setNewDiary((prev) => ({ ...prev, weather: target.value }))}
              />
              cloudy
            </label>
            <label>
              <input
                type="radio"
                value="stormy"
                onChange={({ target }) => setNewDiary((prev) => ({ ...prev, weather: target.value }))}
              />
              stormy
            </label>
            <label>
              <input
                type="radio"
                value="windy"
                onChange={({ target }) => setNewDiary((prev) => ({ ...prev, weather: target.value }))}
              />
              windy
            </label>
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
