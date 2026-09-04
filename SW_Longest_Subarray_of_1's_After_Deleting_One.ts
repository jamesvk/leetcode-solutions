/**
 * ============================================================
 * LC 1493 — Longest Subarray of 1s After Deleting One Element
 * Date closed: 9/3/26   Status: OWNED (cold solve, CLEAN —
 * budget reframe transferred from 1004 same session)
 * ============================================================
 * PROBLEM (paraphrased): given a binary array, return the length
 * of the longest subarray of all 1s after deleting exactly one
 * element.
 * CONSTRAINTS:
 * //  1 <= nums.length <= 10^5
 *
 * ---- STEP 1: CONSTRAINTS (ritual) ----
 * // "nums.length <= 10^5" → BANS nested loops; one-pass
 * //    required.
 * // No k parameter — the budget is always exactly 1 deletion.
 *
 * ---- STEP 2: ONE PLAIN SENTENCE ----
 * // Return the length of the longest contiguous run of 1s after
 * // deleting exactly one element. (Unit = the window.)
 *
 * ---- STEP 3: PATTERN CUE ----
 * // Variable-size sliding window (Cue B) — "longest subarray
 * // such that a budget holds" (budget = at most 1 zero inside
 * // the window).
 *
 * ---- INTUITION ----
 * // Every subarray can only have one zero, so find the longest
 * // subarray with at most one zero and return that minus 1 —
 * // "deleting exactly one element" is the same as "allowing at
 * // most one zero in the window, then subtracting the deleted
 * // slot from the count."
 *
 * ---- APPROACH ----
 * // 1. Edge case: if no zeros exist, every element is 1, but we
 * //    must still delete one → return nums.length - 1.
 * // 2. Three variables: left, budget (zero count), best.
 * // 3. For loop with right growing the window: if the entering
 * //    element is 0, increment budget.
 * // 4. If budget > 1 (over the limit): if nums[left] is 0,
 * //    decrement budget; always advance left. (Using `if` instead
 * //    of `while` works here because right adds at most one zero
 * //    per step, so the overshoot is always exactly 1 — the
 * //    "non-shrinking window" technique.)
 * // 5. Measure the window: right - left + 1 (inclusive /
 * //    fence-post counting). Update best.
 * // 6. Return best - 1: the window includes the zero we're
 * //    "deleting," so it doesn't count toward the answer.
 *
 * ---- WHY THE `if` VERSION IS SAFE (non-shrinking invariant) ----
 * // At most the loop adds 1 extra zero each iteration. If the
 * // budget is greater than 1, it also removes 1 index position
 * // (left++) each time — so the window size will never be
 * // greater than the best window so far. During illegal states
 * // the window slides at constant size (right +1, left +1) and
 * // Math.max never picks a bad window. The window can only grow
 * // again once the budget drops back to legal.
 * //
 * // This generalizes: for k deletions, change to budget > k.
 * // The overshoot is still at most 1 per iteration regardless
 * // of the cap, so `if` stays safe at any threshold. With k as
 * // a parameter and no best - 1, this becomes LC 1004.
 *
 * ---- COMPLEXITY (evidence first, then label) ----
 * // Time: right traverses the array once; left traverses at most
 * //   once (never rewinds, never passes right) — total travel
 * //   ≈ 2n → O(n).
 * // Space: three fixed variables → O(1).
 */

function longestSubarray(nums: number[]): number {
  if (!nums.includes(0)) return nums.length - 1;

  let left: number = 0;
  let budget: number = 0;
  let best: number = 0;

  for (let right = 0; right < nums.length; right++) {
    if (nums[right] === 0) budget++;

    if (budget > 1) {
      if (nums[left] === 0) budget--;
      left++;
    }

    best = Math.max(best, right - left + 1);
  }

  return best - 1;
}
