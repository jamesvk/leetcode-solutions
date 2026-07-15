/**
 * LeetCode 206 — Reverse Linked List
 * https://leetcode.com/problems/reverse-linked-list/
 *
 * Pattern: Linked List — in-place pointer reversal (three-pointer technique)
 *
 * --- Intuition ---
 * Walk through the list once and flip each node's `next` pointer to face the
 * PREVIOUS node instead of the next one. Reverse in place — re-wire the existing
 * nodes rather than build a new list.
 *
 * --- Approach ---
 * Track two pointers: prev (starts null) and current (starts head). Loop while
 * current !== null. Each iteration:
 *   1. SAVE current.next in a temp (next) FIRST — flipping the pointer destroys it.
 *   2. FLIP: point current.next back to prev.
 *   3. ADVANCE prev to current, then current to the saved next.
 * When the loop ends, current is null and prev sits on the new head — return prev.
 *
 * --- Complexity ---
 * Time: O(n).
 *   Visit each node exactly once; the loop advances current by one node per step.
 * Space: O(1).
 *   Uses a fixed number of pointers (prev, current, next) no matter how long the
 *   list is. Re-wires existing nodes instead of allocating a new list. NOTE: O(1)
 *   means CONSTANT memory, not zero — the temp `next` is new, but the count of
 *   variables doesn't grow with input size.
 *
 * --- Notes to self ---
 * - The save step is the whole problem. current.next has to do two jobs that
 *   collide: it's the only road to the rest of the list AND it must be overwritten
 *   to point backward. Overwrite without saving first = stranded, rest of list lost.
 *   Save `next` (step 1) and use it (step 3) are a PAIR.
 * - prev starts null because the original head becomes the new tail, and a tail
 *   points to null. The first flip (current.next = prev) sets that up automatically.
 * - Empty list handled for free: head=null -> loop never runs -> returns prev (null).
 * - Mental model: stepping stones. Before flipping a stone backward, memorize where
 *   the next stone is — flipping erases that info.
 * - Recursive solution exists but is O(n) space (call stack). Iterative is better.
 * - RE-SOLVE COLD tomorrow morning + Friday — got help with final assembly/syntax.
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

function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let current: ListNode | null = head;

  while (current !== null) {
    const next: ListNode | null = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  return prev;
}
