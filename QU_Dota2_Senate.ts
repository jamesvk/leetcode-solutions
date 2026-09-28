/* ============================================================================
 * LC 649 — DOTA2 SENATE
 * ============================================================================
 * Date closed: 9/28/26
 * Status: GUIDED — 9/21 solution taken external (disclosed); 9/24 attempt
 *         answer-exposed (quarantined deck read first, disclosed); 9/28 rep
 *         assisted (prior code viewed, disclosed). COLD RE-VERIFY OWED:
 *         blank file, everything closed — item 1 of the next session.
 *         Queue section closes on that solve, not this one.
 *
 * PROBLEM (paraphrased): Senators from two parties ('R' and 'D') act in
 * rounds, in their original order; on each turn a senator bans one opposing
 * senator. Return which party wins ("Radiant" or "Dire").
 *
 * CONSTRAINTS (raw):
 *   n == senate.length
 *   1 <= n <= 10^4
 *   senate[i] is 'R' or 'D'
 *
 * ----------------------------------------------------------------------------
 * STEP 1: CONSTRAINTS (ritual — bans / permits / warns / gifts)
 * ----------------------------------------------------------------------------
 * n <= 10^4        -> BANS n^2: 10^4 x 10^4 = 10^8 operations — too slow.
 *                     An O(n) solution exists and is expected. This also bans
 *                     shift() inside the loop (each shift re-slides the whole
 *                     array — the hidden triangle). Head-index pointers instead.
 * senate[i] R or D -> GIFTS exactly two groups: split into two lines, one per
 *                     party — no general k-party machinery needed.
 * 1 <= n           -> GIFTS at least one senator: no empty-input guard.
 *
 * ----------------------------------------------------------------------------
 * STEP 2: ONE PLAIN SENTENCE
 * ----------------------------------------------------------------------------
 * Return the name of the party that still has a senator alive when the other
 * party has none — "Radiant" or "Dire". (Unit = a party name, a string.)
 *
 * ----------------------------------------------------------------------------
 * STEP 3: PATTERN CUE
 * ----------------------------------------------------------------------------
 * QUEUE (two queues). Phrase found in the statement: "round-based procedure"
 * ... senators act "in the original order" — survivors rejoin the BACK of the
 * line for the next round. A line served from the front is a queue.
 *
 * ----------------------------------------------------------------------------
 * INTUITION
 * ----------------------------------------------------------------------------
 * The key realization is that same-party senators never need to be compared —
 * only the earliest member of each party matters, whoever is earlier in line
 * acts first and bans the other, and the winner rejoins behind everyone
 * currently alive.
 *
 * ----------------------------------------------------------------------------
 * APPROACH
 * ----------------------------------------------------------------------------
 * 1. Walk the string once and push each senator's index (their place in line)
 *    into their party's array — one line for R, one for D.
 * 2. Track the front of each line with a head-index pointer (rHead, dHead) —
 *    never shift(); walking the pointer forward IS removing from the line.
 * 3. While both lines still have someone alive (head < length on both):
 *    compare the two front senators. The smaller index got in line earlier,
 *    so he acts first and bans the other.
 * 4. Both fronts leave the line (both heads advance): the loser is banned
 *    forever; the winner is pushed to the back of his own line with
 *    index + n, so he cannot cut ahead of anyone still waiting this round.
 * 5. When one line runs out (its head reaches its length), the other party
 *    wins — return that party's name. "Alive" under head-index means
 *    head < length; the arrays only grow, so array.length alone can never
 *    answer who won.
 *
 * ----------------------------------------------------------------------------
 * COMPLEXITY (evidence first, then label)
 * ----------------------------------------------------------------------------
 * TIME: Every trip through the while loop permanently eliminates exactly one
 * senator — two fronts step up, only one returns. With n senators there can
 * be at most n fights, and each fight is O(1) work using head indexes; the
 * build loop adds n more steps — about 2n operations total, and constants
 * drop -> O(n).
 * SPACE: Each senator occupies at most one live slot at a time (removed from
 * the front before ever being re-added), and total pushes across both arrays
 * are bounded by ~2n -> O(n).
 *
 * KNOWN TRAPS HIT ON THIS PROBLEM (for the re-verify):
 *   - shift() in the loop (deck #30 trap #1) — banned by 10^4.
 *   - Return line reading r.length under head-index — arrays never shrink,
 *     so it is always truthy; liveness is head < length everywhere (hit
 *     twice: 9/24 and 9/28).
 *   - while (r[rHead] && d[dHead]) — falsy-zero trap: the senator at
 *     position 0 IS the value 0, which reads as false and exits the loop
 *     before any fight ("DR" convicts it). Existence is a length question,
 *     never a value-truthiness question (2nd offense: LC 11, LC 649).
 * ========================================================================== */

function predictPartyVictory(senate: string): string {
  const n = senate.length;
  const r: number[] = [];
  const d: number[] = [];

  for (let i = 0; i < n; i++) {
    if (senate[i] === 'R') r.push(i);
    else d.push(i);
  }

  let rHead = 0;
  let dHead = 0;

  while (rHead < r.length && dHead < d.length) {
    const rFirst = r[rHead];
    const dFirst = d[dHead];

    // both fronts leave the line: one banned forever, one re-queued
    rHead++;
    dHead++;

    if (rFirst < dFirst)
      r.push(rFirst + n); // R acted first — D's front is banned
    else d.push(dFirst + n); // D acted first — R's front is banned
  }

  return rHead < r.length ? 'Radiant' : 'Dire';
}
