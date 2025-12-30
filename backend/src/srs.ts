export type ReviewResult = { rating: number }; // 0..5

export function computeNext(params: {
  prevInterval?: number; // days
  prevReps?: number;
  prevEf?: number;
  result: ReviewResult;
}) {
  const q = params.result.rating;
  let ef = params.prevEf ?? 2.5;
  let reps = params.prevReps ?? 0;
  let interval = params.prevInterval ?? 0;

  if (q >= 3) {
    if (reps === 0) {
      interval = 1;
    } else if (reps === 1) {
      interval = 6;
    } else {
      interval = Math.round(Math.max(1, interval * ef));
    }
    reps += 1;
  } else {
    reps = 0;
    interval = 0;
  }

  // update ease factor
  ef = ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  if (ef < 1.3) ef = 1.3;

  return { interval, reps, ef, dueDays: interval };
}
