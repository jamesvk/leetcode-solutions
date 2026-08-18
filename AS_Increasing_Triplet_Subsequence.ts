/**
 * ============================================================
 * LC 334 — Increasing Triplet Subsequence
 * Date closed: 8/17/26   Status: OWNED (LC-passed from memory
 * 8/13 + reproduced 8/17; pre-solve glance disclosed)
 * ============================================================
 * PROBLEM (paraphrased): return true if there exist indices
 * i < j < k with nums[i] < nums[j] < nums[k]; otherwise false.
 * CONSTRAINTS:
 * //  1 <= nums.length <= 5 * 10^5
 * //  -2^31 <= nums[i] <= 2^31 - 1
 *
 * ---- STEP 1: CONSTRAINTS (ritual) ----
 * // "5 * 10^5" → BANS nested loops (n^2 ≈ 2.5 * 10^11 blows the
 * //    ~10^8 budget); a one-pass shape is forced.
 * // "-2^31 .. 2^31 - 1" → WARNS: negatives and duplicates exist —
 * //    comparisons need care (this is why <= matters).
 *
 * ---- STEP 2: ONE PLAIN SENTENCE ----
 * // Return true if three values in increasing index order (not
 * // necessarily adjacent) strictly increase; otherwise false.
 *
 * ---- STEP 3: PATTERN CUE ----
 * // Greedy running trackers — an existence question ("does there
 * // EXIST...") with an n too big for anything but one pass.
 *
 * ---- INTUITION ----
 * // Keep track of the smallest value seen and the smallest valid
 * // middle value; the moment any number beats both, a triplet
 * // exists — return true. If the loop ends, none exists.
 *
 * ---- APPROACH ----
 * // 1. Declare two tracking variables, smallest and medium, both
 * //    set to Infinity.
 * // 2. Loop the array with three conditionals:
 * //    - nums[i] <= smallest → reassign smallest (new floor).
 * //    - else if nums[i] <= medium → reassign medium (a valid
 * //      second rung: it's bigger than some earlier smallest).
 * //    - else → return true (bigger than both = the third rung).
 * // 3. If the third branch never fires, return false.
 * // Why the updates are safe: when medium was set, something
 * // smaller already existed to its left — updating smallest
 * // later doesn't erase that. The variables are evidence a
 * // triplet is possible, not the triplet itself.
 * // Why <= and not <: duplicates exist ([1,2,2] must be false);
 * // <= makes equal values update a tracker instead of falsely
 * // escaping into the return-true branch.
 *
 * ---- COMPLEXITY (evidence first, then label) ----
 * // Time: one loop through the entire array → O(n).
 * // Space: two fixed variables regardless of input size → O(1).
 */

function increasingTriplet(nums: number[]): boolean {
  let smallest: number = Infinity;
  let medium: number = Infinity;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] <= smallest) smallest = nums[i];
    else if (nums[i] <= medium) medium = nums[i];
    else return true;
  }

  return false;
}
