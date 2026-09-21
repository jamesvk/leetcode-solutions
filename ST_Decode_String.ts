/* =====================================================================
   LC 394 — DECODE STRING
   =====================================================================
   Date closed: 9/21 (Monday; block opened Friday 9/18)
   Status: OWNED — ESCROW-PENDING
           Flips final on a reported green LC submit (still owed).
           Attestation: guided 9/17; cold attempt 9/18 incomplete
           (park half only). Cold blank-file solve 9/20 — clean window
           (no files, no AI) — reproduced the FULL taught structure
           from memory: park on '[', resume on ']', proper else chain,
           return. One regression (multi-digit count) convicted via
           the targeted input "12[ab]" and self-fixed. Complexity
           retrieved over two passes 9/21.

   PROBLEM (paraphrased):
   Decode k[encoded] where the encoded part repeats k times and
   brackets can nest, e.g. "3[a2[c]]" → "accaccacc".

   CONSTRAINTS (raw):
   • 1 <= s.length <= 30
   • s consists of lowercase English letters, digits, and '[' ']'
   • s is guaranteed to be a valid input
   • all integers in s are in [1, 300]
   • output length is guaranteed not to exceed 10^5

   STEP 1: CONSTRAINTS (ritual)
   • s.length <= 30 → the INPUT is tiny, so any input-based cost is
     noise — this is the which-n flag: the real measuring stick must
     be somewhere else (the output).
   • k in [1, 300] → WARNS: counts have up to THREE digits, so digit
     handling must ACCUMULATE — count = count*10 + digit. A bare
     `count = digit` keeps only the last digit (the 9/20 regression;
     the ritual catches this bug before it is written).
   • guaranteed valid → GIFTS: every ']' has its '[', so pops never
     hit an empty stack and TypeScript's `!` on pop() is justified.
   • output <= 10^5 → confirms it: the honest n of this problem is
     L, the decoded length.

   STEP 2: ONE PLAIN SENTENCE
   Return the fully decoded string. (Unit = characters of the
   OUTPUT.)

   STEP 3: PATTERN CUE
   Stack — nested structure / delayed work. Phrase found in the
   statement: k[encoded] with brackets INSIDE brackets — an outer
   repetition cannot run until its inner content exists, so
   unfinished work must wait its turn.

   INTUITION
   The key realization is that an outer repetition cannot be
   performed until its inner content is fully built, so each
   unfinished level is parked in order and the most recently opened
   level always finishes first — exactly the order a stack
   guarantees.

   APPROACH
   1. Walk the characters once, holding the level currently being
      built (a string and its pending count).
   2. Digit → accumulate: count = count*10 + digit (multi-digit).
   3. '[' → PARK: push the current string and count onto their
      stacks, reset both — a new inner level begins.
   4. ']' → RESUME: pop the count and the parked parent; the current
      level becomes parent + current.repeat(count). Parking and
      resuming are a matched pair.
   5. Letter → append to the current level.
   6. Return the current string — by the end, every level has folded
      back into it.

   COMPLEXITY (evidence first, then label)
   Time: the measuring stick is NOT the input — it is the output. A
   13-character input like 10[10[10[a]]] produces 1,000 characters.
   Every output character must be written at least once: no
   algorithm produces L characters in fewer than L writes, so the
   floor is L. Label: O(L), the decoded length. (Fine print: deeply
   nested letters are recopied as outer brackets close; the headline
   stays output-driven.)
   Space: freeze the fattest moment — the string being built plus
   every parked string on the stack. Every character alive in that
   photo is a piece of the future answer, so the photo never holds
   more than ~L characters. Label: O(L).
   ===================================================================== */

function decodeString(s: string): string {
  const strStack: string[] = []; // parked parent strings, one per open '['
  const countStack: number[] = []; // parked multipliers
  let currStr = ''; // the level currently being built
  let currCount = 0; // the count currently being read

  for (const ch of s) {
    if (ch >= '0' && ch <= '9') {
      currCount = currCount * 10 + +ch; // accumulate — k reaches 300
    } else if (ch === '[') {
      strStack.push(currStr); // park the parent
      countStack.push(currCount); // park its multiplier
      currStr = '';
      currCount = 0;
    } else if (ch === ']') {
      currStr = strStack.pop()! + currStr.repeat(countStack.pop()!); // resume
    } else {
      currStr += ch; // letters only — the else guard
    }
  }

  return currStr;
}
