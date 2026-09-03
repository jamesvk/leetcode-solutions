/**
 * ============================================================
 * LC 643 — Maximum Average Subarray I
 * Date closed: 9/2/26   Status: OWNED (shape self-named unaided,
 * no cue card in hand; cold re-solve same day, CLEAN)
 * ============================================================
 * PROBLEM (paraphrased): find the contiguous subarray of exactly
 * length k with the largest average; return that average.
 * CONSTRAINTS:
 * //  1 <= k <= n <= 10^5
 * //  -10^4 <= nums[i] <= 10^4
 * //  answers within 10^-5 of the true value are accepted
 *
 * ---- STEP 1: CONSTRAINTS (ritual) ----
 * // "n <= 10^5" → BANS nested loops (n^2 ≈ 10^10 vs the ~10^8
 * //    budget); a one-pass shape is forced.
 * // "-10^4 <= nums[i] <= 10^4" → negatives exist; sum can dip,
 * //    no special handling needed since we track sum not count.
 * // "within 10^-5" → a float-tolerance promise; sum first,
 * //    divide once at the end, to avoid compounding rounding
 * //    error from repeated division.
 *
 * ---- STEP 2: ONE PLAIN SENTENCE ----
 * // Return the maximum average of any contiguous run of exactly
 * // k numbers. (Unit = the window.)
 *
 * ---- STEP 3: PATTERN CUE ----
 * // Fixed-size sliding window — "subarray of length k" printed
 * // in the statement.
 *
 * ---- INTUITION ----
 * // The key realization is that sliding the window by one
 * // position only changes two numbers — the one entering and the
 * // one leaving — so the running sum updates in O(1) instead of
 * // being rescanned from scratch.
 *
 * ---- APPROACH ----
 * // 1. Build the first window of length k with a loop; seed
 * //    totalSum to its sum.
 * // 2. Seed best = totalSum (the first window is the best seen
 * //    so far).
 * // 3. Slide: for each later index, totalSum += the entering
 * //    number and -= the number leaving (exactly k positions
 * //    back). Update best if the new totalSum is greater.
 * // 4. Divide totalSum by k only once, at the very end, to get
 * //    the average.
 *
 * ---- COMPLEXITY (evidence first, then label) ----
 * // Time: within one iteration, add + subtract + compare (+
 * //   assign when best updates) = a small constant number of
 * //   operations; across n iterations that's ~4n → drop the
 * //   constant → O(n). (Total travel view: each element enters
 * //   the sum once and leaves once ≈ 2n — same conclusion.)
 * // Space: three fixed variables (totalSum, best, loop index) →
 * //   O(1).
 */

function findMaxAverage(nums: number[], k: number): number {
  let totalSum: number = 0;
  for (let i = 0; i < k; i++) totalSum += nums[i];
  let best: number = totalSum;

  for (let i = k; i < nums.length; i++) {
    totalSum = totalSum + nums[i] - nums[i - k];
    if (totalSum > best) best = totalSum;
  }

  return best / k;
}
