import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 10000;

// Enable CORS
app.use(cors({
  origin: 'https://prescription-frontend-ayr7.onrender.com'
}));

app.use(bodyParser.json());

app.post('/generate', async (req, res) => {
  const { model, prompt, stream } = req.body;

  try {
    const response = `
Patient Name: John Doe
Age: 45
Symptom(s): chest pain

Medicines:
- Aspirin, 75mg, 1 tablet daily
- Nitroglycerin, 0.4mg, 1 tablet as needed

Advice:
- Rest and avoid strenuous activity
- Monitor blood pressure daily
- Seek immediate help if pain worsens
`;

    res.json({ response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
