/**
 * LeetCode 1137 — N-th Tribonacci Number
 * --------------------------------------
 * Each term is the sum of the previous three. Build forward from the three
 * known base cases instead of recursing down from n.
 *
 * Time:  O(n)  — one pass, each term computed exactly once.
 * Space: O(1)  — only three numbers held regardless of n; nothing accumulates.
 *
 * Why not recursion: each call branches into three more and the same
 * subproblems get recomputed across branches (~O(3^n)). At n=25 that's
 * billions of calls for 26 distinct answers. Bottom-up computes each once.
 *
 * Why three variables instead of an array: each term only reads back three
 * positions, so anything older is dead. A table would be O(n) space.
 *
 * Solve status: rolling-variable loop written cold (the actual optimization).
 * Guided on: missing base-case guards, T1 value, and the loop-bound/return pair.
 * Watch on redo:
 *   - the loop bound and the return are a MATCHED SET:
 *       i <= n  →  return c
 *       i < n   →  return a + b + c
 *     Mixing them returns a term too early.
 *   - trace n = 0 and n = 3 before submitting; both bugs lived there.
 */

function tribonacci(n: number): number {
  let a: number = 0;
  let b: number = 1;
  let c: number = 1;

  if (n === 0) return 0;
  if (n === 1) return 1;
  if (n === 2) return 1;

  for (let i = 3; i <= n; i++) {
    const d = a + b + c;
    a = b;
    b = c;
    c = d;
  }

  return c;
}

export { tribonacci };
