/* =====================================================================
   LC 735 — ASTEROID COLLISION
   =====================================================================
   Date closed: 9/20 (Sunday catch-up block)
   Status: OWNED — ESCROW-PENDING
           Flips final on a reported green LC submit (still owed).
           Attestation: two cold blank-file solves — 9/18 (one bug,
           the stale-top re-read, self-fixed with the copy-by-value
           mechanism stated) and 9/20 (fully unassisted: nothing open,
           no AI; the alive-scope bug self-caught and self-fixed with
           the correct mechanism BEFORE coaching arrived).

   PROBLEM (paraphrased):
   Asteroids move along a row. Sign = direction (+ right, − left),
   magnitude = size. When two meet, the smaller explodes; equal sizes
   destroy both. Return the asteroids that survive all collisions.

   CONSTRAINTS (raw):
   • 2 <= asteroids.length <= 10^4
   • -1000 <= asteroids[i] <= 1000
   • asteroids[i] !== 0

   STEP 1: CONSTRAINTS (ritual)
   • length <= 10^4 → BANS O(n^2): 10^4 × 10^4 = 10^8 operations —
     over budget. The size bound demands ~O(n). (Verbal misread this
     as "permits nested loops" — sizes budget loops, and this size
     refuses the multiplied kind.)
   • values within ±1000 and never 0 → GIFTS: the sign is a clean
     direction flag, -a magnitude comparisons are always safe, and
     there is no zero edge case to handle.

   STEP 2: ONE PLAIN SENTENCE
   Return the asteroids still intact after every collision resolves,
   in their original order. (Unit = asteroids.)

   STEP 3: PATTERN CUE
   Stack — survivor matching. Phrase found in the statement:
   "collide" / "meet" — each new asteroid interacts with the CLOSEST
   prior survivor moving toward it, and one collision can chain into
   the next.

   INTUITION
   The key realization is that only the most recent surviving
   right-mover can ever meet a new left-mover, so resolving each
   newcomer against the latest survivor — repeatedly if it keeps
   winning — settles every collision in the correct order.

   APPROACH
   1. Walk the asteroids left to right, keeping survivors on a stack;
      the top of the stack is the closest asteroid to the newcomer's
      left.
   2. A fight is only possible when the top moves right (positive) and
      the newcomer moves left (negative). Same direction never
      collides; opposite directions moving apart never collide — the
      pair must be moving inward, toward each other.
   3. While a fight is possible and the newcomer is still alive:
      smaller top → pop it and re-read the new top, because the
      newcomer keeps fighting (this chain is why it is a while, not an
      if); equal top → pop it and the newcomer dies too; bigger top →
      the newcomer dies.
   4. If the newcomer survives the whole chain, push it — it becomes
      the new top. Per-asteroid state (alive) is born fresh inside the
      loop: initialization at the top of scope IS the reset, so stale
      state is impossible by construction.

   COMPLEXITY (evidence first, then label)
   Time: each asteroid is pushed at most once and popped at most once —
   give each one coin at push, spend one coin per pop: n coins exist,
   so ALL while-iterations across the entire run total at most n pops.
   Never multiply the loops (that assumes every pass pays a full
   chain); SUM the shared budget: ~2n total work → O(n).
   Cross-check: the 10^4 size bound is the problem-setter saying an
   O(n) solution exists.
   Space: worst case nothing collides (e.g. all positive) and the
   stack holds all n asteroids at peak → O(n). If the interviewer
   excludes the output array, auxiliary space is O(1) — state which
   convention is in use.
   ===================================================================== */

function asteroidCollision(asteroids: number[]): number[] {
  const ans: number[] = []; // survivor stack; top = closest asteroid to the newcomer's left

  for (const a of asteroids) {
    let alive = true; // born fresh per asteroid — the 9/20 self-catch
    let top = ans[ans.length - 1];

    while (alive && ans.length && top > 0 && a < 0) {
      if (top < -a) {
        ans.pop(); // top dies; the newcomer keeps fighting
        top = ans[ans.length - 1]; // re-read after mutation (deck #21: snapshots go stale)
      } else if (top === -a) {
        ans.pop(); // equal sizes: both die
        alive = false;
      } else {
        alive = false; // bigger top: the newcomer dies
      }
    }

    if (alive) ans.push(a);
  }

  return ans;
}
