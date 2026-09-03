/**
 * ============================================================
 * LC 1456 — Maximum Number of Vowels in a Substring of Given Length
 * Date closed: 9/2/26   Status: OWNED (cold solve, second attempt,
 * CLEAN — earlier loop-condition bug did not recur)
 * ============================================================
 * PROBLEM (paraphrased): return the maximum number of vowels
 * (a, e, i, o, u) in any substring of s with length exactly k.
 * CONSTRAINTS:
 * //  1 <= k <= s.length <= 10^5
 * //  s consists of lowercase English letters
 *
 * ---- STEP 1: CONSTRAINTS (ritual) ----
 * // "s.length <= 10^5" → BANS nested loops; one pass required.
 * // "lowercase English letters" → the vowel set is fixed at 5
 * //    characters, independent of n — bounds the per-character
 * //    check to constant cost regardless of input size.
 *
 * ---- STEP 2: ONE PLAIN SENTENCE ----
 * // Return the maximum count of vowels found in any window of
 * // exactly k characters. (Unit = the window.)
 *
 * ---- STEP 3: PATTERN CUE ----
 * // Fixed-size sliding window — "substring of given length k"
 * // printed in the statement.
 *
 * ---- INTUITION ----
 * // Sliding the window by one position only changes two
 * // characters — the one entering and the one leaving — so the
 * // vowel count updates in O(1) instead of being rescanned from
 * // scratch.
 *
 * ---- APPROACH ----
 * // 1. Declare a vowels array for membership checks.
 * // 2. Build the first window (length k) with a loop; count its
 * //    vowels into `total`.
 * // 3. Seed best = total (only one window checked so far).
 * // 4. Slide: for each later index, check the entering character
 * //    (increment total if it's a vowel) and the leaving
 * //    character at i - k (decrement total if it was a vowel),
 * //    keeping the window at exactly length k. Update best if the
 * //    new total is greater.
 *
 * ---- COMPLEXITY (evidence first, then label) ----
 * // Time: each iteration does a fixed, small number of constant
 * //   operations (character lookups + a bounded 5-element
 * //   membership check + increment/decrement/compare) — constant
 * //   means the cost doesn't scale with n. n iterations × a
 * //   constant → O(n).
 * // Space: fixed variables only (total, best, loop index, the
 * //   5-element vowels list) → O(1).
 */

function maxVowels(s: string, k: number): number {
  const vowels: string[] = ['a', 'e', 'i', 'o', 'u'];

  let total: number = 0;
  for (let i = 0; i < k; i++) {
    if (vowels.includes(s.charAt(i))) total++;
  }

  let best: number = total;

  for (let i = k; i < s.length; i++) {
    if (vowels.includes(s.charAt(i))) total++;
    if (vowels.includes(s.charAt(i - k))) total--;
    if (total > best) best = total;
  }

  return best;
}
