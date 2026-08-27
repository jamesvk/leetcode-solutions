/**
 * ============================================================
 * LC 11 — Container With Most Water
 * Date closed: 8/27/26   Status: OWNED (cold solve 8/19;
 * missing-return bug self-caught)
 * ============================================================
 * PROBLEM (paraphrased): each element of `height` is a vertical
 * line at that index. Find the two lines that, with the x-axis,
 * form a container holding the most water; return that amount.
 * CONSTRAINTS:
 * //  2 <= height.length <= 10^5
 * //  0 <= height[i] <= 10^4
 *
 * ---- STEP 1: CONSTRAINTS (ritual) ----
 * // "2 <= n <= 10^5" → BANS nested loops (n^2 ≈ 10^10 vs the
 * //    ~10^8 budget); a one-pass shape is forced.
 * // "0 <= height[i]" → zeros exist; min() handles them for free
 * //    (a zero line simply yields area 0).
 * // No "sorted" gift: positions are fixed, which is exactly why
 * //    width matters as much as height.
 *
 * ---- STEP 2: ONE PLAIN SENTENCE ----
 * // Return the largest water area any PAIR of lines can hold,
 * // where area = the shorter line's height × the distance
 * // between them. (Unit = the pair.)
 *
 * ---- STEP 3: PATTERN CUE ----
 * // Converging from both ends: two elements chosen to maximize
 * // a quantity measured BETWEEN them.
 *
 * ---- INTUITION ----
 * // The key realization is that the shorter line caps the area —
 * // so starting from the widest pair, moving the taller line can
 * // never help; only replacing the shorter line can do better.
 *
 * ---- APPROACH ----
 * // 1. Two pointers: left at the start, right at the end.
 * // 2. At each step compute the area and update the max if it is
 * //    greater.
 * // 3. Move the pointer with the smaller height inward.
 * // 4. Stop when the pointers meet; return the best seen.
 * // WHY moving the shorter side is safe: every inward step
 * //   shrinks the width by 1, so a later pair can only win by
 * //   raising the MINIMUM. Moving the taller pointer leaves the
 * //   shorter line in place — the minimum cannot rise while the
 * //   width falls, so that move is guaranteed no better. Moving
 * //   the shorter side is therefore the only move with any
 * //   upside, and it safely discards that line from all future
 * //   pairs. Each step permanently eliminates one line, so the
 * //   pointers must meet after n steps.
 *
 * ---- BUG NOTE (8/19) ----
 * // First cold version computed everything correctly but never
 * // returned `best` — the function fell through to undefined.
 * // The TypeScript return-type annotation flags this before the
 * // judge does: typed signatures are bug-catchers.
 *
 * ---- COMPLEXITY (evidence first, then label) ----
 * // Time: left and right together cross the array exactly once
 * //   (total travel ≈ n) → O(n).
 * // Space: two pointers + one best-tracker → O(1).
 */

function maxArea(height: number[]): number {
  let left: number = 0;
  let right: number = height.length - 1;
  let best: number = 0;

  while (left < right) {
    const area = Math.min(height[left], height[right]) * (right - left);
    if (area > best) best = area;

    if (height[left] < height[right]) left++;
    else right--;
  }

  return best;
}
