/**
 * ============================================================
 * LC 151 — Reverse Words in a String
 * Date closed: 8/17/26   Status: GUIDED (cold solve pending: 8/18)
 * ============================================================
 * PROBLEM (paraphrased): given a string s, return the words in
 * reverse order, joined by single spaces — no leading/trailing
 * spaces, no double spaces in the output.
 * CONSTRAINTS:
 * //  1 <= s.length <= 10^4
 * //  s consists of English letters (upper/lowercase), digits,
 * //  and spaces
 * //  there is at least one word in s
 *
 * ---- STEP 1: CONSTRAINTS (ritual) ----
 * // "1 <= s.length <= 10^4"  → PERMITS even n^2 (~10^8, borderline):
 * //    speed is not the challenge here — the permission case.
 * // "letters, digits, spaces" → WARNS: multiple spaces between
 * //    words + leading/trailing spaces exist. The trap is edge
 * //    whitespace, not the algorithm.
 * // "at least one word in s" → GIFT: no empty-output edge case;
 * //    smallest legal input = a single word.
 *
 * ---- STEP 2: ONE PLAIN SENTENCE ----
 * // Return the WORDS of s in reverse ORDER, single-spaced.
 * // (Unit of the problem = the word, not the character.)
 *
 * ---- STEP 3: PATTERN CUE ----
 * // Cue 4: parse/rebuild strings. Phrase that fired it: words,
 * // spaces, delimiters in the statement.
 *
 * ---- INTUITION ----
 * // The task reverses WORD ORDER — you can't reverse the order of
 * // things you never formed. So: form tokens → transform (reverse
 * // their order) → rejoin single-spaced. Character-level rebuilding
 * // fails because there is nothing to reverse.
 *
 * ---- APPROACH (pipeline) ----
 * // 1. trim() the edge whitespace.
 * // 2. split(' ') into tokens; filter out the '' empties that
 * //    multiple spaces create.
 * // 3. reverse() the word array (in place).
 * // 4. join(' ') to rebuild with exactly single spaces.
 *
 * ---- APPROACH (manual word-collector) ----
 * // 1. Walk the string once; non-space chars accumulate into
 * //    `current` (the word being formed).
 * // 2. On a space WITH a word in hand (current.length > 0), bank
 * //    current into words[] and reset it — spaces without a word
 * //    in hand (runs of spaces, leading spaces) bank nothing.
 * // 3. After the loop, push the final word — it never sees a
 * //    trailing space, so the loop alone would drop it (the
 * //    classic 151 bug).
 * // 4. reverse() the words array and join(' ').
 *
 * ---- COMPLEXITY, PIPELINE (evidence first, then label) ----
 * // Time: five sequential full passes (trim, split, filter,
 * //   reverse, join) ≈ O(5n) → drop the constant → O(n).
 * // Space: four hidden allocations — trim's new string, split's
 * //   new array, filter's new array, join's new output string
 * //   (reverse mutates in place: allocates nothing) ≈ O(4n) → O(n).
 *
 * ---- COMPLEXITY, MANUAL (worst-case qualifier required) ----
 * // Time: O(n) typical; O(n^2) WORST-CASE — current += char recopies
 * //   (immutable strings, the triangle: 1+2+..+k = k(k+1)/2 ≈ k^2/2),
 * //   but current resets at every space so the triangle runs per
 * //   word; it only detonates on one giant word. Fix if poked:
 * //   collect chars in an array, join per word → strictly O(n).
 * // Space: words array + output string → O(n). Dead intermediate
 * //   strings are garbage-collected (paid in TIME, not space).
 *
 * ---- BANKED FACT ----
 * // O(1) extra space is IMPOSSIBLE for 151 in JS/TS: strings are
 * // immutable, so an n-sized output must be built. The O(1) version
 * // exists only in mutable-string languages (e.g. C++). Interview
 * // answer: "not in this language, and here's why."
 */

// ---- SOLUTION 1 (pipeline) ----
function reverseWords(s: string): string {
  return s
    .trim()
    .split(' ')
    .filter((item) => item !== '')
    .reverse()
    .join(' ');
}

// ---- SOLUTION 2 (manual word-collector) ----
function reverseWordsManual(s: string): string {
  let current: string = '';
  const words: string[] = [];

  for (let i = 0; i < s.length; i++) {
    if (s.charAt(i) !== ' ') current += s.charAt(i);
    if (s.charAt(i) === ' ' && current.length) {
      words.push(current);
      current = '';
    }
  }

  if (current.length) words.push(current);

  return words.reverse().join(' ');
}
