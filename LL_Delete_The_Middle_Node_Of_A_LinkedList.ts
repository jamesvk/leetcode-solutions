/* ============================================================================
 * LC 2095 — Delete the Middle Node of a Linked List          [Linked List]
 * ----------------------------------------------------------------------------
 * Date closed: Wed 9/30/2026
 * Status: OWNED — ESCROW-PENDING.
 *
 * PROBLEM (paraphrased): Given the head of a singly linked list, remove the
 * node at index floor(n / 2) and return the head.
 *
 * CONSTRAINTS:
 *   - number of nodes n: 1 <= n <= 10^5
 *   - 1 <= Node.val <= 10^5
 *
 * STEP 1: CONSTRAINTS (ritual)
 *   - n <= 10^5   -> PERMITS O(n): 10^5 steps. BANS O(n^2): 10^10 steps, too
 *                    slow. WARNS n = 1: deleting the only node leaves an empty
 *                    list, so return null.
 *   - n >= 1      -> GIFTS: head is never null on entry.
 *   - val range   -> IRRELEVANT: we never read or compare the values; only the
 *                    arrows matter.
 *
 * STEP 2: ONE PLAIN SENTENCE
 *   Return the head of the same list with the node at position floor(n / 2)
 *   unhooked. (Unit = one node.)
 *
 * STEP 3: PATTERN CUE
 *   Linked List — two cues fire:
 *     Cue A (fast & slow pointers): phrase "middle node."
 *     Cue D (to delete, stop one node early): phrase "delete."
 *
 * ---------------------------------------------------------------------------
 * VERSION 1 — BRUTE FORCE: count, then walk to the node before the middle
 * ---------------------------------------------------------------------------
 * INTUITION
 *   The key realization is that a list can't jump to its middle, but once you
 *   know how long it is, you can count your way to the spot just before the
 *   middle and route the chain around it.
 *
 * APPROACH
 *   1. If the list has one node, return null: removing it leaves nothing.
 *   2. Traverse the whole list once, counting nodes, to get the length.
 *   3. The middle index is floor(length / 2).
 *   4. Start a pointer at the head (index 0) and move it forward mid - 1 times.
 *      That lands it at index mid - 1: the node directly BEFORE the middle.
 *   5. Point that node's next past the middle (before.next = before.next.next).
 *      The pointer and head refer to the same nodes, so this changes the real
 *      list; nothing is copied.
 *   6. Return head.
 *
 * COMPLEXITY (evidence first, then label)
 *   Time:  the count pass touches all n nodes; the second walk touches about
 *          n / 2. n + n/2 = 1.5n, which simplifies to          -> O(n)
 *   Space: a fixed number of pointer/number variables (length, curr, mid,
 *          before) no matter how long the list is              -> O(1)
 *
 * ---------------------------------------------------------------------------
 * VERSION 2 — OPTIMAL: fast & slow pointers, one pass
 * ---------------------------------------------------------------------------
 * INTUITION
 *   The key realization is that a walker moving twice as fast covers the whole
 *   list in the time a slower walker covers half of it, so when the fast one
 *   runs out of list, the slow one is at the middle.
 *
 * APPROACH
 *   1. If the list has one node, return null.
 *   2. Start slow at the head and fast two nodes ahead. That head start makes
 *      slow stop one node BEFORE the middle, which is where it must stand to
 *      cut (check with 3 nodes: slow on node 1, fast on node 3, loop never
 *      runs, cut node 2).
 *   3. While fast and fast.next both exist, move slow 1 step and fast 2 steps.
 *   4. Point slow's next past the middle (slow.next = slow.next.next).
 *   5. Return head.
 *
 * COMPLEXITY (evidence first, then label)
 *   Time:  the loop runs about n / 2 times; fast covers about n nodes and slow
 *          about n / 2. About 1.5n pointer moves total, which simplifies to
 *                                                              -> O(n)
 *   Space: two pointer variables, regardless of n               -> O(1)
 *
 * BRUTE vs OPTIMAL (honest comparison)
 *   Same Big-O and roughly the same total pointer moves (~1.5n each). The
 *   optimal version wins on ONE PASS: it never needs the length up front, so
 *   it works when the length is unknown, and it's the reusable pattern for
 *   2130 (Max Twin Sum) and cycle detection. Lead with brute, then offer
 *   fast & slow as the one-pass upgrade.
 * ========================================================================== */

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// VERSION 1 — brute force
function deleteMiddleBrute(head: ListNode | null): ListNode | null {
  if (head === null || head.next === null) return null; // 1 node -> empty list

  let length = 0;
  let curr: ListNode | null = head;
  while (curr !== null) {
    // pass 1: count every node
    length++;
    curr = curr.next;
  }

  const mid = Math.floor(length / 2);
  let before: ListNode = head;
  for (let i = 0; i < mid - 1; i++) {
    before = before.next!; // pass 2: stop at index mid - 1
  }

  before.next = before.next!.next; // route around the middle node
  return head;
}

// VERSION 2 — optimal: fast & slow pointers
function deleteMiddle(head: ListNode | null): ListNode | null {
  if (head === null || head.next === null) return null; // 1 node -> empty list

  let slow: ListNode = head;
  let fast: ListNode | null = head.next.next; // 2-node head start -> slow stops BEFORE middle

  while (fast !== null && fast.next !== null) {
    slow = slow.next!; // 1 step
    fast = fast.next.next; // 2 steps
  }

  slow.next = slow.next!.next; // route around the middle node
  return head;
}

// ---- tests ----
const build = (arr: number[]): ListNode | null =>
  arr.reduceRight<ListNode | null>((next, v) => new ListNode(v, next), null);
const toArr = (h: ListNode | null): number[] => {
  const out: number[] = [];
  while (h) {
    out.push(h.val);
    h = h.next;
  }
  return out;
};
for (const t of [[1, 3, 4, 7, 1, 2, 6], [1, 2, 3, 4], [2, 1], [1]]) {
  console.log(
    t,
    toArr(deleteMiddleBrute(build(t))),
    toArr(deleteMiddle(build(t))),
  );
}
// [1,3,4,1,2,6]   [1,2,4]   [2]   []
