/*
================================================================================
  maxDepth of a Nested Object  (transfer rep, Binary Tree - DFS)
  Date closed: 10/15/2026
  Status: OWNED. Cold solve from a blank file, logic PASS on the first try.
          Attestation: blank file yes; decks no; AI no; prior code no;
          assists: one disclosed TypeScript type question (Record<string, unknown>
          + typeof null), no logic help. CLEAN.
          History: 10/9 GUIDED (+= accumulator for a max, missing +1),
          10/14 carried, 10/15 cold PASS (accumulator watch held).
================================================================================

PROBLEM (paraphrased):
  Return the maximum nesting depth of a plain object; the outer object counts as 1.

CONSTRAINTS:
  - Keys at any single level: 0 <= k <= 10^4
  - Total keys across all levels: N <= 10^4
  - Nesting depth <= 100
  - Values are numbers, strings, booleans, or plain objects (no arrays, no null)

--------------------------------------------------------------------------------
STEP 1: CONSTRAINTS (ritual)
  - N <= 10^4 keys        -> BANS n^2: 10^4 x 10^4 = 10^8, too slow. Touch each
                             key once.
  - depth <= 100          -> GIFTS recursion: the call stack never goes more than
                             100 deep, so recursing is safe.
  - no null / no arrays   -> GIFTS a simple check: typeof value === 'object' is
                             enough in the logic. (TypeScript still needs
                             value !== null for the compiler, because typeof null
                             is also 'object'.)

STEP 2: ONE PLAIN SENTENCE
  Return the maximum depth of nested objects. (Unit = one level of nesting.)

STEP 3: PATTERN CUE
  DFS on a nested object (Binary Tree - DFS), shape "ask the children."
  Phrase found: "maximum nesting depth."
  Each object is a node; each value that is an object is one of its children.

INTUITION
  The key realization is that the depth of an object is 1 plus the deepest
  nested object inside it.

APPROACH
  1. Start best at 1, because the object I'm standing in counts as one level,
     even if it's empty.
  2. Loop through the keys. For each key, start count at 0. If the value is a
     nested object, set count to 1 + the recursive call on that object.
  3. After each key, keep best as the larger of best and count.
  4. Return best.

STEP 0 ROWS (trace of { a: { b: 2 }, c: 3 }, expected 2)
  # | call                      | key | object?        | count     | best | returns
  1 | maxDepth({a:{b:2}, c:3})  | a   | yes, go inside | (wait)    | 1    |
  2 | maxDepth({b:2})           | b   | no             | 0         | 1    | 1
  3 | back in call 1            | a   | -              | 1 + 1 = 2 | 2    |
  4 | call 1                    | c   | no             | 0         | 2    | 2  ✓

  Extra cases:
  {}                                   -> 1  (no keys, best stays 1)
  { a: { b: { c: 1 } }, d: { e: 1 } }  -> 3  (siblings: a's branch is 3,
                                               d's is 2; the deeper sibling wins)

COMPLEXITY (evidence first, then label)
  Time:  every key is visited exactly once, with constant work per key, so N
         steps total -> O(N).
  Space: photo at the deepest moment: one call is stacked per nesting level,
         so at most D calls (D <= 100) -> O(D).

TRAPS ON RECORD
  - Accumulator reflex: += for a max (10/9). Max uses Math.max, never +=.
  - typeof null === 'object': add value !== null before recursing (card #70).
================================================================================
*/

function maxDepth(obj: Record<string, unknown>): number {
  let best: number = 1;

  for (const key in obj) {
    let count: number = 0;
    const value = obj[key];

    if (typeof value === 'object' && value !== null) {
      count = 1 + maxDepth(value as Record<string, unknown>);
    }

    best = Math.max(best, count);
  }

  return best;
}

// Quick checks
console.log(maxDepth({ a: 1, b: 'x' })); // 1
console.log(maxDepth({ a: { b: 2 }, c: 3 })); // 2
console.log(maxDepth({})); // 1
console.log(maxDepth({ a: { b: { c: 1 } }, d: { e: 1 } })); // 3
