/* =====================================================================
   LC 2390 — REMOVING STARS FROM A STRING
   =====================================================================
   Date closed: 9/20 (Sunday catch-up block)
   Status: OWNED
           Cold clean solve 9/17 (COLD attested). Narration
           re-delivered 9/20 — best pattern-cue statement to date.
           LC submit: owed — report green to finalize the ledger.

   PROBLEM (paraphrased):
   A string contains letters and stars. Each star removes itself AND
   the closest non-star character to its left. Return what remains.

   CONSTRAINTS (raw):
   • 1 <= s.length <= 10^5
   • s consists of lowercase English letters and '*'
   • The operation is guaranteed to always be possible

   STEP 1: CONSTRAINTS (ritual)
   • length <= 10^5 → BANS O(n^2): 10^5 × 10^5 = 10^10 — far over
     budget. The size bound demands O(n). (Sizes budget LOOPS —
     "nested loops," not "nested arrays.")
   • lowercase + '*' only → no case, digit, or unicode edge cases.
   • "always possible" → GIFTS: a star never arrives at an empty
     stack, so pop() needs no guard.

   STEP 2: ONE PLAIN SENTENCE
   Return the string that survives after every star deletes itself
   and the nearest kept character to its left. (Unit = characters.)

   STEP 3: PATTERN CUE
   Stack — survivor matching. Phrase found in the statement: "closest
   non-star character to its LEFT" — each remover acts on the most
   recent survivor, which is exactly what a stack's top is.

   INTUITION
   The key realization is that a star always deletes the most
   recently kept character, so holding survivors in order and
   removing from the end settles every deletion without ever
   rebuilding the string.

   APPROACH
   1. Walk the characters left to right, keeping survivors in a
      stack (array used with push/pop only).
   2. Non-star → push it; it becomes the newest survivor.
   3. Star → pop the top; the star itself is never stored. No index
      tracking needed — position IS the stack order.
   4. Join the survivors with '' at the end — ONE bulk copy. (The
      rejected alternative, slicing the string per star, is the
      rebuild-triangle; ignoring stars avoids it entirely.)

   COMPLEXITY (evidence first, then label)
   Time: each character is pushed at most once and popped at most
   once — a shared coin budget of ~2n across the whole run — plus
   join('') writes the ≤ n-character result in one bulk pass, a real
   third phase of ~n. Total ~3n → O(n). (The join phase is the part
   a label-only answer skips — it was the 9/17 miss on this exact
   problem.)
   Space: photograph the fattest moment — an input with zero stars
   leaves the stack holding all n characters, and the output string
   is another n → O(n).
   ===================================================================== */

function removeStars(s: string): string {
  const ansArr: string[] = []; // survivor stack; top = most recently kept character

  for (const ch of s) {
    if (ch === '*')
      ansArr.pop(); // star deletes the newest survivor; star never stored
    else ansArr.push(ch);
  }

  return ansArr.join(''); // one bulk copy — no per-star string rebuilding
}
