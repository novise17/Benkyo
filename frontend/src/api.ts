export async function computeSrs(body: any) {
  const res = await fetch('/api/srs/compute', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  return res.json();
}
