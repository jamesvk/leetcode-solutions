/**
 * ============================================================
 * LC 238 — Product of Array Except Self
 * Date closed: 8/17/26   Status: OWNED (cold + trace-caught fix)
 * ============================================================
 * PROBLEM (paraphrased): return an array where answer[i] is the
 * product of all elements of nums except nums[i]. O(n) time
 * required; division banned.
 * CONSTRAINTS:
 * //  2 <= nums.length <= 10^5
 * //  -30 <= nums[i] <= 30
 * //  prefix/suffix products guaranteed to fit in 32-bit
 *
 * ---- STEP 1: CONSTRAINTS (ritual) ----
 * // "2 <= nums.length <= 10^5" → BANS nested loops (10^10 ops
 * //    blows the ~10^8 budget); an O(n) shape is forced.
 * // "-30 <= nums[i] <= 30" → WARNS: zeros and negatives exist —
 * //    another reason the division shortcut is rotten.
 * // "fits in 32-bit" → GIFT: overflow is pre-handled; write
 * //    normal code.
 *
 * ---- STEP 2: ONE PLAIN SENTENCE ----
 * // Return a new array where each position holds the product of
 * // every number in nums except the number in that same position.
 *
 * ---- STEP 3: PATTERN CUE ----
 * // Prefix/suffix accumulation — "for each element, something
 * // about all the OTHER elements," with the shortcut (division)
 * // banned.
 *
 * ---- INTUITION ----
 * // Everything-except-me = (everything to my LEFT) × (everything
 * // to my RIGHT). Precompute both sides for every position, then
 * // multiply them pairwise.
 *
 * ---- APPROACH ----
 * // 1. Create three arrays: prefix, suffix, answer.
 * // 2. Loop left→right: prefix[i] = prefix[i-1] * nums[i-1].
 * //    Seed prefix[0] = 1 — 0 would poison every product; 1
 * //    changes nothing (the multiplicative identity).
 * // 3. Loop right→left (mirror): suffix[i] = suffix[i+1] *
 * //    nums[i+1]. Seed the last position to 1, same reason.
 * // 4. Final loop: answer[i] = prefix[i] * suffix[i].
 *
 * ---- BUG NOTE (self-caught by trace, 8/17) ----
 * // First version lacked `else`: at i = 0 BOTH statements ran —
 * // the seed 1 was planted, then immediately overwritten by
 * // prefix[-1] * nums[-1] = undefined × undefined = NaN, which
 * // the judge prints as null. Symptom chain: null → NaN → some
 * // arithmetic touched undefined. Fix: make the branches
 * // exclusive with `else`.
 *
 * ---- COMPLEXITY (evidence first, then label) ----
 * // Time: three sequential loops over the full array → O(3n) →
 * //   drop the constant → O(n).
 * // Space: three created arrays of length n → O(3n) → O(n).
 */

function productExceptSelf(nums: number[]): number[] {
  const prefix: number[] = [];
  const suffix: number[] = [];
  const answer: number[] = [];

  for (let i = 0; i < nums.length; i++) {
    if (i === 0) prefix[i] = 1;
    else prefix[i] = prefix[i - 1] * nums[i - 1];
  }

  for (let i = nums.length - 1; i >= 0; i--) {
    if (i + 1 === nums.length) suffix[i] = 1;
    else suffix[i] = suffix[i + 1] * nums[i + 1];
  }

  for (let i = 0; i < nums.length; i++) {
    answer[i] = prefix[i] * suffix[i];
  }

  return answer;
}
