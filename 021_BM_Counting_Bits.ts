/**
 * LeetCode 338 — Counting Bits
 * ----------------------------
 * Return an array ans of length n+1 where ans[i] = number of 1-bits in i.
 *
 * NAIVE (this version): for each i, peel bits one at a time.
 *   i % 2         reads the rightmost bit (1 or 0)
 *   Math.floor(i/2) drops that bit, shifting everything right one position
 * (In any base, the last digit is the remainder when you divide by that base,
 *  and integer-dividing by the base removes it. Base 2 here.)
 *
 * Time:  O(n log n) — outer loop runs n times; the inner while loop runs
 *        ~log2(i) times per number, since halving a number reaches 0 in
 *        ~log2 steps.
 * Space: O(n) for the output array, or O(1) auxiliary if the required output
 *        is excluded (only num and count are extra, neither grows with n).
 */

function countBits(n: number): number[] {
  const ans = new Array(n + 1);

  for (let i = 0; i < ans.length; i++) {
    let num = i;
    let count = 0;

    while (num > 0) {
      count += num % 2;
      num = Math.floor(num / 2);
    }

    ans[i] = count;
  }

  return ans;
}

/**
 * O(n) DP version (same pattern as Min Cost Climbing Stairs — each answer
 * reuses an already-computed earlier answer instead of recomputing):
 *
 *   ans[i] = ans[i >> 1] + (i & 1)
 *
 *   i >> 1  is i with its last bit dropped — a SMALLER number already solved
 *   i & 1   is whether that dropped bit was a 1
 * So bit-count of i = bit-count of (i with last bit removed) + that last bit.
 * No inner loop — one lookup per i.
 *
 * function countBits(n: number): number[] {
 *   const ans = new Array(n + 1).fill(0);
 *   for (let i = 1; i <= n; i++) {
 *     ans[i] = ans[i >> 1] + (i & 1);
 *   }
 *   return ans;
 * }
 *
 * Time O(n), Space O(n) output / O(1) auxiliary.
 */

export { countBits };
