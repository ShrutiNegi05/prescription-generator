import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 10000;

// Allow requests from frontend
app.use(cors({
  origin: 'https://prescription-frontend-ayr7.onrender.com'
}));

app.use(bodyParser.json());

app.post('/generate', async (req, res) => {
  // your prescription logic or Ollama API call
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
