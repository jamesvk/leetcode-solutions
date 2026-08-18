/**
 * ============================================================
 * LC 443 — String Compression
 * Date closed: 8/17/26   Status: GUIDED (solution reviewed;
 * cold solve pending: 8/18, solutions folder closed first)
 * ============================================================
 * PROBLEM (paraphrased): compress the char array in place using
 * consecutive groups of repeating characters — write the char
 * once, then its count if the group length > 1 (counts of 10+
 * written digit by digit). Return the new length; the answer
 * lives in the first `length` cells. Constant extra space only.
 * CONSTRAINTS:
 * //  1 <= chars.length <= 2000
 * //  chars[i] is a lowercase/uppercase letter, digit, or symbol
 *
 * ---- STEP 1: CONSTRAINTS (ritual) ----
 * // "1 <= chars.length <= 2000" → PERMITS even nested loops
 * //    (2000^2 = 4M, trivial vs the ~10^8 budget). Speed is not
 * //    the challenge — the in-place requirement is.
 * // "constant extra space" → the cue itself, printed in the
 * //    statement: read/write two pointers forced.
 *
 * ---- STEP 2: ONE PLAIN SENTENCE ----
 * // Compress the array in place — each run of repeating
 * // characters becomes the character plus its count (when above
 * // 1) — and return how many cells the compressed version fills.
 * // (Unit of the problem = the RUN, not the character.)
 *
 * ---- STEP 3: PATTERN CUE ----
 * // Cue 1: read/write two pointers. Phrase that fired it:
 * // "in place" / "constant extra space" in the statement.
 *
 * ---- INTUITION ----
 * // The key realization is that a compressed group is never
 * // longer than the group itself — so the answer can safely be
 * // written over the array while it is still being read.
 *
 * ---- APPROACH ----
 * // 1. Two pointers, write and read, both starting at 0.
 * // 2. Outer loop while read < chars.length: grab the run's
 * //    character; mark runStart = read.
 * // 3. Inner while: advance read to the end of the run (same
 * //    character). runLength = read - runStart — counting by
 * //    subtraction, no tally variable.
 * // 4. Write the character once at chars[write], advance write.
 * // 5. If runLength > 1, write each digit of String(runLength)
 * //    into its own cell (handles 10+ automatically).
 * // 6. Return write — it advanced once per output cell, so it
 * //    already IS the new length.
 *
 * ---- COMPLEXITY (evidence first, then label) ----
 * // Time: count each pointer's TOTAL TRAVEL, not loops × loops —
 * //   the inner while advances the same read pointer, which
 * //   never rewinds (it continues one traversal, never restarts
 * //   work). read moves n times total; write moves <= n times;
 * //   digits add <= 4 per group → ~2n → O(n) ALWAYS, including
 * //   the all-same-characters case (outer runs once, inner n).
 * // Space: two pointer variables + in-place mutation of the
 * //   given array → O(1) extra.
 */

function compress(chars: string[]): number {
  let write: number = 0;
  let read: number = 0;

  while (read < chars.length) {
    const char = chars[read];
    const runStart = read;

    while (read < chars.length && chars[read] === char) {
      read++;
    }

    const runLength = read - runStart;

    chars[write] = char;
    write++;

    if (runLength > 1) {
      for (const digit of String(runLength)) {
        chars[write] = digit;
        write++;
      }
    }
  }

  return write;
}
