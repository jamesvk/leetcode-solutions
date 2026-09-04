/**
 * ============================================================
 * LC 1004 — Max Consecutive Ones III
 * Date closed: 9/3/26   Status: GUIDED → cold solve 9/3 evening,
 * CLEAN. Total-travel argument self-derived.
 * ============================================================
 * PROBLEM (paraphrased): given a binary array and integer k,
 * you may flip at most k zeros to ones; return the length of the
 * longest run of 1s achievable.
 * CONSTRAINTS:
 * //  1 <= nums.length <= 10^5
 * //  0 <= k <= nums.length
 *
 * ---- STEP 1: CONSTRAINTS (ritual) ----
 * // "nums.length <= 10^5" → BANS nested loops; one-pass or
 * //    n log n required.
 * // "0 <= k <= nums.length" → k can be 0 (no flips allowed) or
 * //    equal to n (flip everything) — both edge cases handled
 * //    naturally by the window.
 *
 * ---- STEP 2: ONE PLAIN SENTENCE ----
 * // Return the length of the longest contiguous subarray of 1s
 * // after flipping at most k zeros. (Unit = the window.)
 *
 * ---- STEP 3: PATTERN CUE ----
 * // Variable-size sliding window (Cue B) — "longest subarray
 * // such that a budget holds" (budget = at most k zeros inside
 * // the window).
 *
 * ---- INTUITION ----
 * // The key realization is that "flip at most k zeros" is the
 * // same as "allow at most k zeros inside the window" — so the
 * // problem becomes finding the longest window that stays within
 * // a budget. Every Cue-B problem has this shape: a constraint
 * // stated as a transformation ("flip") that translates into a
 * // budget on what the window may contain.
 *
 * ---- APPROACH ----
 * // 1. Three variables: left (window start), zeroCount (budget
 * //    tracker), best (longest legal window seen).
 * // 2. For loop with right pointer growing the window: if the
 * //    entering element is 0, increment zeroCount.
 * // 3. While zeroCount > k (budget violated): if the element at
 * //    left is 0, decrement zeroCount (reclaim a flip); always
 * //    advance left (shrink the window).
 * // 4. The window is now legal — measure it: right - left + 1
 * //    (inclusive counting / fence-post correction). Update best.
 *
 * ---- COMPLEXITY (evidence first, then label) ----
 * // Time: right advances n times total; left advances at most n
 * //   times total (it only moves right, never backward, and
 * //   never past right — the inner while is NOT n work per
 * //   iteration, it's n work TOTAL across all iterations). Total
 * //   travel ≈ 2n → O(n).
 * // Space: three fixed variables → O(1).
 */

function longestOnes(nums: number[], k: number): number {
  let left: number = 0;
  let zeroCount: number = 0;
  let best: number = 0;

  for (let right = 0; right < nums.length; right++) {
    if (nums[right] === 0) zeroCount++;

    while (zeroCount > k) {
      if (nums[left] === 0) zeroCount--;
      left++;
    }

    best = Math.max(best, right - left + 1);
  }

  return best;
}
