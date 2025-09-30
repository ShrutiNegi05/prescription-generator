// backend/server.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fetch from 'node-fetch'; // npm install node-fetch@2

const app = express();
const PORT = process.env.PORT || 10000;

// Enable CORS for your frontend
app.use(cors({
  origin: 'https://prescription-frontend-ayr7.onrender.com'
}));

app.use(bodyParser.json());

// POST /generate endpoint
app.post('/generate', async (req, res) => {
  const { model, prompt, stream } = req.body;

  try {
    // ----- CALL OLLAMA API -----
    const OLLAMA_API_URL = 'http://69.62.76.171:11434/api/generate';

    const response = await fetch(OLLAMA_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, prompt, stream: false })
    });

    const data = await response.json();
    const respText = data.response || data.output || 'No response from Ollama';
    res.json({ response: respText });

  } catch (err) {
    console.error('Error generating prescription:', err);
    res.status(500).json({ error: 'Failed to generate prescription' });
  }
});

// Optional GET endpoint for testing
app.get('/', (req, res) => {
  res.send('Backend is live. Use POST /generate to get prescriptions.');
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
