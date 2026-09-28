/* ============================================================================
 * LC 933 — NUMBER OF RECENT CALLS
 * ============================================================================
 * Date closed: 9/28/26
 * Status: GUIDED — original solve was external/given (relabeled 9/21 by his
 *         own disclosure). 9/28 redo = deck-informed application rep:
 *         no-shift head-index rewrite PASSED FIRST TRY (his write);
 *         complexity guided (coin argument produced by him as a question,
 *         confirmed and completed by coach). Cold retest owed on the next
 *         Friday cold-redo cycle per the 9/21 ruling.
 *
 * PROBLEM (paraphrased): A counter is pinged at strictly increasing times t
 * (milliseconds); each ping returns how many pings happened in the last
 * 3000 ms, including the current one.
 *
 * CONSTRAINTS (raw):
 *   1 <= t <= 10^9
 *   Each call to ping uses a strictly larger value of t than before
 *   At most 10^4 calls to ping
 *
 * ----------------------------------------------------------------------------
 * STEP 1: CONSTRAINTS (ritual — bans / permits / warns / gifts)
 * ----------------------------------------------------------------------------
 * <= 10^4 calls       -> BANS shift-in-a-loop: shift() re-slides the whole
 *                        remaining queue, a nested loop in disguise —
 *                        10^4 calls x up to 10^4 slides = 10^8 steps, banned.
 *                        Head-index pointer expected: ~2 x 10^4 = ~20,000
 *                        steps for the entire run.
 * t up to 10^9        -> WARNS: values are big, but they are only COMPARED,
 *                        never used as sizes or indexes — sizes budget loops,
 *                        values do not.
 * strictly increasing -> GIFTS the one-way pointer: the front of the line is
 *                        always the oldest ping, so expired once = expired
 *                        forever, and the pointer never needs to go back.
 *
 * ----------------------------------------------------------------------------
 * STEP 2: ONE PLAIN SENTENCE
 * ----------------------------------------------------------------------------
 * Return how many pings, including this one, happened within the window
 * [t - 3000, t]. (Unit = a count of pings.)
 *
 * ----------------------------------------------------------------------------
 * STEP 3: PATTERN CUE
 * ----------------------------------------------------------------------------
 * EXPIRING WINDOW QUEUE (deck #30, cue A) — phrase found in the statement:
 * "the number of requests that has happened in the past 3000 ms." A time
 * window that only expires off the front and grows at the back is a queue.
 * Format tell (deck #31): the Input array of method-name strings is a CALL
 * SCRIPT — this is a design problem; the class remembers between calls.
 *
 * ----------------------------------------------------------------------------
 * INTUITION
 * ----------------------------------------------------------------------------
 * The key realization is that time only moves forward, so once a ping is too
 * old it is too old forever — the window can only ever lose from the front
 * and gain at the back.
 *
 * ----------------------------------------------------------------------------
 * APPROACH
 * ----------------------------------------------------------------------------
 * 1. Keep one array holding every ping's timestamp, plus a pointer marking
 *    where the live window starts. The array never shrinks.
 * 2. On each ping, push the new timestamp onto the end.
 * 3. Walk the pointer forward past every timestamp older than t - 3000.
 *    Walking past IS the removal — nothing is shifted, nothing slides.
 * 4. The answer is the number of live entries: total length minus the
 *    pointer. (Under head-index, array.length alone counts the dead too.)
 *
 * ----------------------------------------------------------------------------
 * COMPLEXITY (evidence first, then label)
 * ----------------------------------------------------------------------------
 * TIME: Follow one timestamp through its whole life: it is pushed once and
 * walked past at most once — two touches, ever (the pointer never moves
 * backward, so nothing expires twice). With n pings total, that is about 2n
 * touches across the entire run; averaged over the n calls, each ping costs
 * a constant amount -> AMORTIZED O(1) per ping. A single slow ping that
 * expires many timestamps is spending work the earlier pings prepaid — one
 * coin deposited per push, one coin spent per expiry.
 * (Old shift() version: each expiry slides the whole remaining queue —
 * 10^4 x 10^4 = 10^8 steps worst case. The banned nested loop in disguise.)
 * SPACE: The array only grows — every timestamp ever pinged stays, dead ones
 * included. Photo at the end of n pings: n numbers alive -> O(n), where n is
 * the total number of pings. This is the memory-for-speed trade: the shift
 * version kept only the live window but paid the triangle for it.
 *
 * KNOWN TRAPS ON THIS PROBLEM:
 *   - shift() in the loop (deck #30 trap #1) — the hidden triangle.
 *   - Returning array length under head-index — counts the dead; the live
 *     count is length - head (same trap hit on LC 649 the same night).
 *   - Spelling: it is a QUEUE; "cue" is the word for pattern cues.
 *   - "Added once AND expired at most once" — two touches, never "or".
 * ========================================================================== */

class RecentCounter {
  private queue: number[] = [];
  private index: number = 0; // head pointer — where the live window starts

  constructor() {}

  ping(t: number): number {
    this.queue.push(t);

    // walk past everything older than the window; walking past IS removal
    while (this.queue[this.index] < t - 3000) {
      this.index++;
    }

    return this.queue.length - this.index; // live entries only
  }
}
