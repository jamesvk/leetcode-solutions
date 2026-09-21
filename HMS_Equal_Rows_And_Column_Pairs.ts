/* =====================================================================
   LC 2352 — EQUAL ROW AND COLUMN PAIRS
   =====================================================================
   Date closed: 9/20 (Sunday catch-up block)
   Status: OWNED
           Original cold solve 9/16. Re-solve required 9/18 (file
           deleted) came back dirty: three versions — a row-rebuild
           indexing bug (built rows, labeled them columns) and a
           `=` vs `+=` overwrite. Clean cold re-verification 9/20,
           fully unassisted, transpose indexing correct first try.
           LC submit: owed — report green to finalize the ledger.

   PROBLEM (paraphrased):
   Given an n×n grid, count the pairs (row r, column c) whose
   sequences are identical, duplicates included.

   CONSTRAINTS (raw):
   • n == grid.length == grid[i].length
   • 1 <= n <= 200
   • 1 <= grid[i][j] <= 10^5

   STEP 1: CONSTRAINTS (ritual)
   • n <= 200 → PERMITS O(n^2): 200 × 200 = 40,000 operations —
     trivial. Sizes budget loops, and this size pays for nested ones.
   • grid[i][j] <= 10^5 → WARNS values are multi-digit → GIFTS the
     delimiter requirement: naive glue collides ("12,4" and "1,24"
     both become "124"), so the key must be join(',').

   STEP 2: ONE PLAIN SENTENCE
   Return how many (row, column) pairs have identical sequences.
   (Unit = pairs.)

   STEP 3: PATTERN CUE
   Canonical key / signature. Phrase found in the statement: rows and
   columns "equal" — comparing whole structures for identity means
   fingerprint each one as a string key and let the map do the
   comparing.

   INTUITION
   The key realization is that a row and a column are equal exactly
   when their fingerprints are equal, so counting every row's
   fingerprint once lets each column be answered with a single lookup
   instead of a comparison against every row.

   APPROACH
   1. Fingerprint every row — join with ',' — and count occurrences
      in a Map (string → count). Duplicates matter: two identical
      rows each pair with a matching column, which is why the value
      is a count, not a boolean.
   2. Build each column: the outer loop picks the column position,
      the inner loop walks DOWN the rows taking grid[row][col] — the
      second index held fixed, the first varying (deck #24: trust the
      slot, not the name).
      Trace evidence on [[3,2,1],[1,7,6],[2,7,7]]:
      col 0 → 3,1,2   col 1 → 2,7,7   col 2 → 1,6,7.
   3. Fingerprint the column the same way and add the map's count for
      it to pairs (?? 0 when the key is absent) — accumulate with +=,
      never = (the 9/18 overwrite bug kept only the last column's
      hits).
   4. Return pairs.

   COMPLEXITY (evidence first, then label)
   Time: phase 1 runs n times and each pass writes an n-character key
   (join) and reads it again to hash (set) → n × n. Phase 2 runs n
   times and each pass does n cell reads + an n-character join + an
   n-character hash (get) → n × n. The += itself is one addition of
   two numbers, O(1) — the real cost on that line is the key hash,
   already counted. Floor: every one of the n^2 cells must be read at
   least once, so O(n^2) is optimal. Label: O(n^2).
   Space: the map holds up to n keys, EACH ~n CHARACTERS long — unit
   is characters, not entries; counting entries gives the wrong O(n).
   n keys × n chars → n^2 stored characters, plus an O(n) scratch
   array. Label: O(n^2).
   ===================================================================== */

function equalPairs(grid: number[][]): number {
  const map = new Map<string, number>(); // row fingerprint → count

  for (const row of grid) {
    const key = row.join(','); // delimiter mandatory: values are multi-digit
    map.set(key, (map.get(key) ?? 0) + 1);
  }

  let pairs = 0;
  for (let c = 0; c < grid.length; c++) {
    // c = which column we're building
    const col: number[] = [];
    for (let r = 0; r < grid.length; r++) {
      // walk down the rows
      col.push(grid[r][c]); // second index fixed → a column
    }
    pairs += map.get(col.join(',')) ?? 0; // += accumulates; ?? 0 for absent keys
  }

  return pairs;
}
