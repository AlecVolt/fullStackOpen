import React, { useState } from 'react';
import type { DiaryEntry, NewDiaryEntry } from '../types';
import { createDiary } from '../services/diaryService';

const NewDiaryForm = ({
  diaries,
  setDiaries,
}: {
  diaries: DiaryEntry[];
  setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
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
    const data = await createDiary(newDiary);
    setDiaries([...diaries, data]);
    setNewDiary(initialEntry);
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
