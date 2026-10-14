/**
 * ============================================================
 * LC 2130 — Maximum Twin Sum of a Linked List
 * Section: Linked List
 * ============================================================
 * Date closed: 10/14/2026
 * Status: OWNED — ESCROW-PENDING (flips to OWNED on the pasted
 *         green submit line for the 10/9 cold code)
 *   - 10/7: brute attempted solo (design correct, one index bug) → optimal GUIDED
 *   - 10/8: brute cold, correct on paper (not submitted); optimal handed over
 *   - 10/9: optimal COLD from blank file, 26 min, code correct.
 *           Attestation: 1 yes / 4 no + CLEAN. Pattern-cue line card-assisted
 *           (deck opened after code) — cue not counted as cold recognition.
 *
 * PROBLEM (paraphrased): In an even-length linked list, node i's twin is
 * node n-1-i. Return the largest sum of any node plus its twin.
 *
 * CONSTRAINTS:
 *   - The number of nodes is an even integer in [2, 10^5]
 *   - 1 <= Node.val <= 10^5
 *
 * ------------------------------------------------------------
 * STEP 1: CONSTRAINTS (ritual)
 * ------------------------------------------------------------
 *   - n up to 10^5 → BANS nested loops: n^2 = 10^10 operations, far too many.
 *     O(n) = 10^5 is fine.
 *   - n is even → GIFTS: every node has exactly one twin, and slow lands
 *     cleanly on the first node of the second half. No odd-middle guard.
 *   - n >= 2 → GIFTS: head is never null and there is at least one pair.
 *   - 1 <= val <= 10^5 → WARNS/GIFTS: largest possible sum is 2 x 10^5,
 *     no overflow. Values are at least 1, so starting best at 0 is safe.
 *
 * ------------------------------------------------------------
 * STEP 2: ONE PLAIN SENTENCE
 * ------------------------------------------------------------
 *   Return the largest sum of a node and its twin. (Unit = one twin pair's sum.)
 *
 * ------------------------------------------------------------
 * STEP 3: PATTERN CUE
 * ------------------------------------------------------------
 *   Pattern: find the middle (fast & slow) + reverse the second half +
 *   walk both halves together.
 *   Phrase found: "the twin of node i is node n-1-i" (mirror pairs).
 *   (Pattern name not produced cold — given.)
 *
 * ------------------------------------------------------------
 * INTUITION
 * ------------------------------------------------------------
 *   The key realization is that a node's twin is its mirror image, so the
 *   second half read backward lines up exactly with the first half read
 *   forward — the second half flipped into reverse.
 *
 * ------------------------------------------------------------
 * APPROACH
 * ------------------------------------------------------------
 *   Brute:
 *   1. Walk the list once and copy every value into an array.
 *   2. For each i in the first half, add arr[i] and arr[n-1-i] and keep the
 *      largest sum.
 *
 *   Optimal:
 *   1. Move slow one step and fast two steps until fast runs out. Because n
 *      is even, slow stops on the first node of the second half.
 *   2. Reverse the second half in place, starting at slow. When the loop
 *      ends, prev is the old last node, which is now the head of the
 *      reversed half.
 *   3. Walk one pointer from head and one from prev at the same time. Each
 *      step pairs a node with its twin; keep the largest sum.
 *   4. Stop when the reversed half runs out (prev is null) and return the
 *      largest sum.
 *
 * ROWS (n = 4, list 5 → 4 → 2 → 1):
 *   fast/slow:  slow 5, fast 5 → slow 4, fast 2 → slow 2, fast null → stop
 *   reversal:   second half 2 → 1 becomes 1 → 2, prev = 1
 *   walk:       5 + 1 = 6 (best 6) → 4 + 2 = 6 (best 6) → prev null → return 6
 *
 * ------------------------------------------------------------
 * COMPLEXITY (evidence first, then label)
 * ------------------------------------------------------------
 *   Brute:
 *     Time evidence: one pass of n to copy, one pass of n/2 to pair →
 *       1.5n operations, which simplifies to O(n).
 *     Space evidence: an array holding all n values → O(n).
 *
 *   Optimal:
 *     Time evidence: slow walks n/2 steps to the middle, the reversal walks
 *       n/2 nodes, the paired walk takes n/2 steps → 1.5n operations, which
 *       simplifies to O(n).
 *     Space evidence: only a fixed set of pointers and one number (slow,
 *       fast, curr, prev, nx, best), no matter how long the list is. The
 *       reversal reuses the existing nodes in place → O(1).
 *
 *   Scale note: the brute pays for the backward walk with an O(n) copy; the
 *   in-place reversal does it in O(1) memory. Memory per request is what
 *   breaks first under load, so the in-place version is the one that ships.
 * ============================================================
 */

/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

// ---------- Brute: copy to array, pair i with n-1-i ----------
function pairSumBrute(head: ListNode | null): number {
  const vals: number[] = [];
  let node: ListNode | null = head;

  while (node !== null) {
    vals.push(node.val);
    node = node.next;
  }

  const n: number = vals.length;
  let best: number = 0;

  for (let i = 0; i < n / 2; i++) {
    best = Math.max(best, vals[i] + vals[n - 1 - i]);
  }

  return best;
}

// ---------- Optimal: fast & slow + reverse second half + paired walk ----------
// 10/9 cold code. Cleanup: non-null assertions (!) added where strict
// TypeScript can't prove the node exists; logic unchanged.
function pairSum(head: ListNode | null): number {
  let slow: ListNode = head!;
  let fast: ListNode | null = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next!;
    fast = fast.next.next;
  }

  let curr: ListNode | null = slow;
  let prev: ListNode | null = null;

  while (curr !== null) {
    const nx = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nx;
  }

  curr = head;
  let best: number = 0;

  while (prev !== null) {
    best = Math.max(best, curr!.val + prev.val);
    curr = curr!.next;
    prev = prev.next;
  }

  return best;
}
