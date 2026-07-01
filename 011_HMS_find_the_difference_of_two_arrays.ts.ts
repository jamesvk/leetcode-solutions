/**
 * LeetCode 2215 — Find the Difference of Two Arrays
 * https://leetcode.com/problems/find-the-difference-of-two-arrays/
 *
 * Pattern: Hash Set
 *
 * --- Intuition ---
 * Convert each nums array into a Set. A Set is backed by a hash table, so
 * membership lookups (.has()) are O(1) — that lets us check "is this number in
 * the other array?" instantly instead of scanning. Sets also drop duplicate
 * values for free, which the problem requires.
 *
 * --- Approach ---
 * Build a set from each array (new Set<number>(nums1)). Loop each set with
 * for...of, and push values that exist in that set but NOT in the other
 * (!otherSet.has(num)) into the corresponding output array.
 *
 * --- Complexity ---
 * Time: O(n)
 *   Building each set is one pass and looping each set is one pass; four O(n)
 *   passes = O(4n) -> O(n). Optimal, since every element must be read at least once.
 *
 * Space: O(n)
 *   The two sets are O(n) each and the output array is O(n); O(3n) -> O(n).
 *
 * --- Note to self ---
 * Original bug: used for...in (iterates keys -> strings) instead of for...of
 * (iterates values -> numbers). TypeScript caught it at compile time with
 * "type 'string' is not assignable to parameter of type 'number'". This is the
 * value of TS: a logic bug caught before running. for...IN = keys, for...OF = values.
 */

function findDifference(nums1: number[], nums2: number[]): number[][] {
  const answerSet: number[][] = [[], []];
  const set1 = new Set<number>(nums1);
  const set2 = new Set<number>(nums2);

  for (const num of set1) {
    if (set2.has(num)) continue;
    answerSet[0].push(num);
  }

  for (const num of set2) {
    if (set1.has(num)) continue;
    answerSet[1].push(num);
  }

  return answerSet;
}