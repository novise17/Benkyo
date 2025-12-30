import React, { useState } from 'react';

type ComputeResponse = {
  interval: number;
  reps: number;
  ef: number;
  dueDays: number;
};

export default function App() {
  const [prevInterval, setPrevInterval] = useState<number | ''>('');
  const [prevReps, setPrevReps] = useState<number | ''>('');
  const [prevEf, setPrevEf] = useState<number | ''>('');
  const [rating, setRating] = useState<number>(4);
  const [result, setResult] = useState<ComputeResponse | null>(null);
  const [loading, setLoading] = useState(false);

  async function onCompute(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const body = {
      prevInterval: prevInterval === '' ? undefined : Number(prevInterval),
      prevReps: prevReps === '' ? undefined : Number(prevReps),
      prevEf: prevEf === '' ? undefined : Number(prevEf),
      result: { rating }
    };
    const res = await fetch('/api/srs/compute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const json = await res.json();
    setResult(json);
    setLoading(false);
  }

  return (
    <div style={{ padding: 20, fontFamily: 'system-ui, sans-serif' }}>
      <h1>Study App — SRS Compute</h1>
      <form onSubmit={onCompute}>
        <div>
          <label>prevInterval (days): </label>
          <input type="number" value={prevInterval} onChange={e => setPrevInterval(e.target.value === '' ? '' : Number(e.target.value))} />
        </div>
        <div>
          <label>prevReps: </label>
          <input type="number" value={prevReps} onChange={e => setPrevReps(e.target.value === '' ? '' : Number(e.target.value))} />
        </div>
        <div>
          <label>prevEf: </label>
          <input step="0.1" type="number" value={prevEf} onChange={e => setPrevEf(e.target.value === '' ? '' : Number(e.target.value))} />
        </div>
        <div>
          <label>rating (0..5): </label>
          <input type="number" min={0} max={5} value={rating} onChange={e => setRating(Number(e.target.value))} />
        </div>
        <div style={{ marginTop: 10 }}>
          <button type="submit" disabled={loading}>{loading ? 'Computing...' : 'Compute'}</button>
        </div>
      </form>

      {result && (
        <div style={{ marginTop: 20 }}>
          <h2>Result</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
