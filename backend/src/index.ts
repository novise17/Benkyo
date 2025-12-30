import express from 'express';
import cors from 'cors';
import { computeNext } from './srs';
import { prisma } from './prismaClient';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.post('/api/srs/compute', (req, res) => {
  try {
    const { prevInterval, prevReps, prevEf, result } = req.body;
    if (!result || typeof result.rating !== 'number') {
      return res.status(400).json({ error: 'result.rating is required (0..5)' });
    }
    const out = computeNext({ prevInterval, prevReps, prevEf, result });
    return res.json(out);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'internal' });
  }
});

// basic example: list decks (stub)
app.get('/api/decks', async (req, res) => {
  const decks = await prisma.deck.findMany({ take: 20 });
  res.json(decks);
});

const port = process.env.PORT ? Number(process.env.PORT) : 4000;
app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
