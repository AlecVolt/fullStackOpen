import express from 'express';
import bmiCalculator from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (!req.query.height || !req.query.weight) {
    return res.status(400).json({ error: 'malformatted parameters' });
  } else {
    const result = bmiCalculator([String(req.query.height), String(req.query.weight)]);
    return res.status(200).json({
      weight: Number(req.query.height),
      height: Number(req.query.weight),
      bmi: result,
    });
  }
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
