import express from 'express';
import bmiCalculator from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (!req.query.height || !req.query.weight) {
    return res.status(400).json({ error: 'malformatted or missing parameters' });
  } else {
    const result = bmiCalculator([JSON.stringify(req.query.height), JSON.stringify(req.query.weight)]);
    return res.status(200).json({
      weight: Number(req.query.height),
      height: Number(req.query.weight),
      bmi: result,
    });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: 'malformatted or missing nparameters' });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(Number(target), daily_exercises);
  return res.status(200).json(result);
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
