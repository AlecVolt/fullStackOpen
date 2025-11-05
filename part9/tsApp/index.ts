import express from 'express';
const app = express();

app.get('/', (_req, res) => {
  res.send('pong');
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
