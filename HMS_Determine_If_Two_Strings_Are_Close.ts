/**
 * ============================================================
 * LC 1657 — Determine if Two Strings Are Close
 * Date closed: 9/17/26   Status: OWNED (cold solve from a blank
 * file; one copy-paste bug caught on review — count(word1) passed
 * twice — reasoning and structure entirely his own)
 * ============================================================
 * PROBLEM (paraphrased): two strings are "close" if one can be
 * turned into the other using two operations, each usable any
 * number of times: (1) swap the positions of any two existing
 * characters, (2) transform every occurrence of one existing
 * character into another existing character. Return whether
 * word1 and word2 are close.
 * CONSTRAINTS:
 * //  1 <= word1.length, word2.length <= 10^5
 * //  word1 and word2 contain only lowercase English letters
 *
 * ---- STEP 1: CONSTRAINTS (ritual) ----
 * // "length <= 10^5" → BANS nested loops (n^2 ~ 10^10 against a
 * //    ~10^8 budget); a linear counting pass is forced.
 * // "lowercase English letters" → GIFTS a bounded alphabet of 26.
 * //    Every map, key loop, and sort in this solution is capped at
 * //    26 entries regardless of input size, which is what makes
 * //    the auxiliary space O(1) rather than O(n).
 * // Two separate lengths n and m → they may differ, and a length
 * //    mismatch is an immediate disqualifier (see intuition).
 *
 * ---- STEP 2: ONE PLAIN SENTENCE ----
 * // Return whether two strings can be made identical under the two
 * // permitted operations. (Unit = the character.)
 *
 * ---- STEP 3: PATTERN CUE ----
 * // Frequency counting (hash map) — the question is about the
 * // make-up of two strings: which characters appear, and how
 * // often, with order irrelevant.
 *
 * ---- INTUITION ----
 * // The key realization is that neither operation can introduce a
 * // character that was not already present, and neither can change
 * // how many characters exist in total — so the two strings must
 * // share the same set of distinct characters, the same length,
 * // and the same collection of occurrence counts, while which
 * // letter carries which count is free to change.
 *
 * ---- APPROACH ----
 * // 1. If the lengths differ, return false immediately: swapping
 * //    moves characters and transforming relabels them, but
 * //    neither adds or removes any, so length is invariant.
 * // 2. Build a frequency map for each word: character -> count.
 * // 3. Check the key sets match in BOTH directions. One direction
 * //    is not enough: every letter of "abc" could appear in some
 * //    other word while that word still holds a letter "abc" lacks
 * //    (compare "abc" and "aab"). This is what operation 2 needs —
 * //    it can only relabel a character into another character that
 * //    is already present, so the distinct-character sets must be
 * //    identical.
 * // 4. Spread each map's values into an array and sort ascending.
 * //    The values are an iterator, and .sort() is an array method,
 * //    so the spread into an array is required.
 * // 5. Compare the two sorted count arrays position by position.
 * //    Because operation 2 allows free relabelling among present
 * //    characters, it does not matter which letter holds which
 * //    count — only that the multiset of counts matches.
 * // 6. Steps 3 and 5 together are necessary and sufficient:
 * //    identical character set + identical count multiset.
 * //    Operation 1 is what makes order irrelevant, which is why
 * //    the comparison is on maps rather than on the strings.
 *
 * ---- COMPLEXITY (evidence first, then label) ----
 * // Time: the length comparison reads a stored .length property,
 * //   no scan, so it is constant. Building the two maps touches
 * //   every character once each: n + m steps. Both key loops run
 * //   over at most 26 keys. Both sorts run on at most 26 values:
 * //   a comparison sort is O(k log k) on k elements, and with
 * //   k <= 26 that is a constant. The final positional compare is
 * //   at most 26 steps. Everything except the counting passes is
 * //   bounded by the alphabet → O(n + m).
 * // Space: the two maps hold at most 26 entries each, and the two
 * //   value arrays at most 26 elements each, no matter how long
 * //   the words are; the remaining variables are fixed → O(1).
 * //   (A hash map over a bounded alphabet is constant space —
 * //   the same reasoning applies to 1456 and 1004.)
 */

function closeStrings(word1: string, word2: string): boolean {
  if (word1.length !== word2.length) return false;

  const count = (w: string): Map<string, number> => {
    const map = new Map<string, number>();
    for (const letter of w) {
      map.set(letter, (map.get(letter) ?? 0) + 1);
    }
    return map;
  };

  const word1Map = count(word1);
  const word2Map = count(word2);

  for (const key of word1Map.keys()) {
    if (!word2Map.has(key)) return false;
  }

  for (const key of word2Map.keys()) {
    if (!word1Map.has(key)) return false;
  }

  const word1Values = [...word1Map.values()].sort((a, b) => a - b);
  const word2Values = [...word2Map.values()].sort((a, b) => a - b);

  for (const [index, value] of word1Values.entries()) {
    if (value !== word2Values[index]) return false;
  }

  return true;
}
