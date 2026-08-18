/**
 * LeetCode 1768 — Merge Strings Alternately
 *
 * INTUITION:
 * Loop through both words together and build a new string of alternating
 * characters, starting with word1. Once the shorter word runs out, the rest
 * of the longer word is simply appended.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * VERSION 1 — BRUTE FORCE (string +=)
 * ─────────────────────────────────────────────────────────────────────────
 * APPROACH:
 * Same loop, but build the result with `result += char`.
 *
 * WHY THIS IS O(n^2) TIME:
 * Strings are immutable, so `result += char` does NOT append in place.
 * Each += builds ONE brand-new string: every character of the old result
 * is copied into it along with the new character, and the old string is
 * discarded. The old-character copy counts per append are 0, 1, 2, ...,
 * n-1 (the string grows by one each pass; the last append recopies n-1
 * old characters). Summing that list with the Gauss pairing trick —
 * write the list forward and reversed, every column sums to n-1, there
 * are n columns, halve the doubled total — gives n(n-1)/2 = (n^2 - n)/2.
 * Drop the constant (÷2) and the lower-order term (-n): O(n^2).
 * Concretely: a 100-char result costs ~4,950 character writes.
 *
 * TIME COMPLEXITY: O(n^2) — n = total characters across both words.
 * SPACE COMPLEXITY: O(n) — the result string scales with the input
 * (only one live string at a time; discarded intermediates don't stack).
 */

function mergeAlternatelyBrute(word1: string, word2: string): string {
  let result = '';
  const maxLength = Math.max(word1.length, word2.length);

  for (let i = 0; i < maxLength; i++) {
    if (word1[i]) result += word1[i];
    if (word2[i]) result += word2[i];
  }

  return result;
}

/**
 * ─────────────────────────────────────────────────────────────────────────
 * VERSION 2 — OPTIMAL (array push + single join)
 * ─────────────────────────────────────────────────────────────────────────
 * APPROACH:
 * Take the max length of the two words so the loop reaches the end of the
 * longer one. At each index, if word1 has a character there, push it; if
 * word2 has a character there, push it. Past a word's end, word1[i] is
 * undefined (falsy), so that side is skipped and only the longer word
 * contributes. Pushing into an array is amortized O(1) per character, and
 * join copies every character exactly ONCE at the end — avoiding the
 * repeated recopy cost of +=.
 *
 * TIME COMPLEXITY: O(n) — each character is handled once in the loop and
 * once in the final join.
 * SPACE COMPLEXITY: O(n) — the output holds every character, so its size
 * scales with the input.
 */

function mergeAlternately(word1: string, word2: string): string {
  const result: string[] = [];
  const maxLength = Math.max(word1.length, word2.length);

  for (let i = 0; i < maxLength; i++) {
    if (word1[i]) result.push(word1[i]);
    if (word2[i]) result.push(word2[i]);
  }

  return result.join('');
}

export { mergeAlternately, mergeAlternatelyBrute };
