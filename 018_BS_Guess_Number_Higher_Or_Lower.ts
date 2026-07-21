/**
 * LeetCode 374 — Guess Number Higher or Lower
 * -------------------------------------------
 * Binary search. Check the midpoint of the range against the pick;
 * each check eliminates half the remaining possibilities.
 *
 * Time:  O(log n) — each iteration halves the search range.
 * Space: O(1)     — a fixed number of variables, reassigned each pass.
 *                   Nothing accumulates as n grows.
 *
 * Optimality: O(log n) is the floor here. Each guess returns one of three
 * outcomes, so you can't eliminate more than half the space per call.
 *
 * Solve status: solved with guidance on debugging (3 bugs found by Claude,
 * fixes applied by James). Re-solve cold to prove ownership.
 * Watch on redo:
 *   - `low = mid` must be in an else branch, not a bare statement
 *   - `mid ± 1`, not `mid` — excludes a known-wrong value so the range
 *     shrinks by ≥1 every pass, which is what makes the loop terminate
 *   - store guess(mid) once; the problem counts API calls
 *   - trace the SMALLEST case (n=1, n=2), not the example case
 */

/**
 * Provided API — do not implement.
 *   -1  the picked number is LOWER than num
 *    1  the picked number is HIGHER than num
 *    0  num is correct
 */
declare function guess(num: number): -1 | 0 | 1;

function guessNumber(n: number): number {
  let low: number = 1;
  let high: number = n;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const guessResult = guess(mid);

    if (guessResult === 0) return mid;
    else if (guessResult === 1)
      low = mid + 1; // pick is higher
    else high = mid - 1; // pick is lower
  }

  // Unreachable given a valid pick, but TS requires every path to return.
  return -1;
}

export { guessNumber };
