/**
 * LeetCode 136 — Single Number
 * ----------------------------
 * Every element appears twice except one. Find the one, in O(n) time / O(1) space.
 *
 * XOR (^) compares two numbers bit-column by bit-column: output 1 where the bits
 * DIFFER, 0 where they MATCH (both 0 or both 1). Two key properties:
 *   x ^ x = 0   — identical numbers match in every column, so they cancel
 *   x ^ 0 = x   — XOR with zero returns the number unchanged (safe accumulator seed)
 *
 * XOR is its own inverse: a ^ b ^ b = a. Think light switches — a bit flipped an
 * even number of times ends up OFF, flipped an odd number of times ends up ON.
 * Every paired number flips its bits twice (off); the lone number flips once (on),
 * so the accumulator ends holding exactly the unpaired number.
 *
 * NOTE: this only works because the problem GUARANTEES pairs + exactly one loner.
 * Change the constraint (two loners, or triples) and plain XOR no longer applies.
 *
 * Time:  O(n)  — single pass.
 * Space: O(1)  — one accumulator; the win over a hash map, which would be O(n).
 */

function singleNumber(nums: number[]): number {
  let ans: number = 0;

  for (let i = 0; i < nums.length; i++) {
    ans = ans ^ nums[i];
  }

  return ans;
}

export { singleNumber };
