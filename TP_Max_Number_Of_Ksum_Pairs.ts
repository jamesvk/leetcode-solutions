/**
 * ============================================================
 * LC 1679 — Max Number of K-Sum Pairs
 * Date closed: 8/27/26   Status: OWNED (cold solve 8/27 —
 * closed the Two Pointers section 4/4)
 * ============================================================
 * PROBLEM (paraphrased): one operation removes two numbers whose
 * sum equals exactly k. Return the maximum number of operations.
 * CONSTRAINTS:
 * //  1 <= nums.length <= 10^5
 * //  1 <= nums[i] <= 10^9
 * //  1 <= k <= 10^9
 *
 * ---- STEP 1: CONSTRAINTS (ritual) ----
 * // "1 <= nums.length <= 10^5" → BANS nested loops; the solution
 * //    must be one pass (plus at most a sort).
 * // Values up to 10^9 → no counting-array trick; comparisons and
 * //    hashing only.
 *
 * ---- STEP 2: ONE PLAIN SENTENCE ----
 * // Return how many pairs can be removed, where each pair is two
 * // elements whose SUM equals k and every element is used at
 * // most once. (Unit = the pair.)
 *
 * ---- STEP 3: PATTERN CUE ----
 * // Converging from both ends, after sorting: a pair of elements
 * // hitting a target value.
 *
 * ---- INTUITION ----
 * // The key realization is that sorting makes the sum move
 * // predictably — a bigger left value raises it, a smaller right
 * // value lowers it — so one comparison tells you which side to
 * // abandon.
 *
 * ---- APPROACH ----
 * // 1. Sort ascending with (a, b) => a - b. (Default .sort() is
 * //    lexicographic: [10, 9, 100] → [10, 100, 9].)
 * // 2. Two pointers: left at index 0, right at the last index.
 * // 3. If the two values sum to k, increment the answer and move
 * //    BOTH pointers inward — consumption is movement; there is
 * //    nothing to delete, since everything outside the pointers
 * //    is already discarded.
 * // 4. If the sum is greater than k, move the right pointer
 * //    inward: it then points at a smaller number, lowering the
 * //    total. Moving the left pointer instead would point at a
 * //    greater number and make the total worse.
 * // 5. If the sum is smaller than k, move the left pointer
 * //    inward for the mirrored reason.
 *
 * ---- COMPLEXITY (evidence first, then label) ----
 * // Time: sorting costs O(n log n); the two-pointer sweep costs
 * //   O(n). Two-phase cost = the heaviest phase → O(n log n).
 * // Space: three variables, sorting in place → O(1) extra.
 *
 * ---- TRADE-OFF TWIN (interview follow-up) ----
 * // A hash-map version runs in O(n) time but O(n) space: for each
 * // number, check whether its partner (k - num) is already
 * // waiting; if so pair them, otherwise park the number. Neither
 * // solution dominates — name the axis: this one wins on space,
 * // the map wins on time.
 */

function maxOperations(nums: number[], k: number): number {
  let left: number = 0;
  let right: number = nums.length - 1;
  let answer: number = 0;

  nums.sort((a, b) => a - b);

  while (left < right) {
    if (nums[left] + nums[right] === k) {
      answer++;
      left++;
      right--;
    } else if (nums[left] + nums[right] > k) {
      right--;
    } else {
      left++;
    }
  }

  return answer;
}
