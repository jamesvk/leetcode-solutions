/*
================================================================================
LC 328 — ODD EVEN LINKED LIST
Section: Linked List
Date closed: 2026-10-07
Status: OWNED — cold solve 10/7 (second session; guided 10/6). Blank file, deck
  №29 closed, no AI, no prior code, no assists, CLEAN. Submitted green with
  today's code. Disclosed: solved from memory of yesterday's two-chain design;
  label stands per contract (transfer test = 2130 next).
Delivered 11:21 (7 min early). Verbal given cold; pattern name blank at delivery.

PROBLEM (paraphrased): Rewire a singly linked list so every odd-INDEXED node
  (1st, 3rd, 5th…) comes first, then every even-indexed node, each group keeping
  its original relative order. Index, not value.

CONSTRAINTS (raw):
  - n = number of nodes, 0 <= n <= 10^4
  - -10^6 <= Node.val <= 10^6
  - Must use O(1) extra space and O(n) time

--------------------------------------------------------------------------------
STEP 1: CONSTRAINTS (ritual)
  - 0 <= n              → WARNS: empty list is legal → head === null guard.
  - n <= 10^4           → BANS nested loops (10^4 × 10^4 = 10^8). Permits one pass.
  - Node.val range      → irrelevant; values are never read, only arrows move.
  - O(1) extra space    → BANS a new array / copying values. Forces rewiring in place.
  - O(n) time           → confirms one traversal.

STEP 2: ONE PLAIN SENTENCE
  Return the same head, with the odd-indexed nodes chained first and the
  even-indexed nodes chained after them, order preserved. (Unit = a node.)

STEP 3: PATTERN CUE
  Pattern: SPLIT-AND-STITCH (two chains, two trackers).
  Phrase found: "O(1) extra space" + "relative order … same as in the input"
  → can't build a new list, must peel the existing one into two chains in place.

INTUITION
  The key realization is that the odd and even nodes can be peeled into two
  separate chains in a single pass, and the start of the even chain is the
  only node we would otherwise lose.

APPROACH
  1. Guard the empty list: if head is null, return null.
  2. Keep two trackers: odd starts at head, even starts at head.next.
  3. Keep a third grip, evenHead = head.next, because the first rewire moves
     node 1's arrow off node 2 and nothing else would point at node 2 again.
     Head itself keeps the odd chain's start, so odd needs no extra grip.
  4. Loop while even and even.next are both real nodes. Even runs one node
     ahead of odd, so it reaches the end first — guarding the leader guards
     both; even.next being non-null is exactly what makes odd.next land on a
     real node, so odd can never become null.
  5. Each iteration: odd skips over even (odd.next = even.next), odd steps
     forward, then even skips over odd (even.next = odd.next), even steps
     forward.
  6. After the loop, odd sits on the last odd node. Stitch: odd.next = evenHead.
  7. Return head.

COMPLEXITY (evidence first, then label)
  Time: every node is touched once as the two trackers traverse the list
    together → n steps → O(n).
  Space: three fixed references (odd, even, evenHead); the loop only rewires
    existing arrows, nothing is allocated → O(1). (Output is the input list,
    not counted.)

TRACE ROWS (n=4: 1→2→3→4). His verbal walked iteration 1; rows below filled
  by coach at delivery — written rows still owed on the next list problem.
  iter | odd | even | after odd.next=even.next | after even.next=odd.next
    1  |  1  |  2   | 1→3                      | 2→4            (odd=3, even=4)
    2  |  3  |  4   | even.next is null → loop stops
  stitch: 3.next = evenHead(2) → 1→3→2→4 ✓

TYPE FIX (character-class, caught before submit): .next is ListNode | null,
  so odd = odd.next needs the ! assertion (the loop guard is the proof) and
  evenHead must be typed ListNode | null.

VERBAL FIXES
  - Pattern name was blank → "split-and-stitch" (card #68). Retrieval data point #13.
  - Intuition was given as mechanics → one "key realization" sentence, no variables.
  - Cut self-grading from interview answers ("intuition is one of my main weaknesses").
  - "Traverse" is the right word. "Rewire" beats "repoint."
================================================================================
*/

function oddEvenList(head: ListNode | null): ListNode | null {
  if (head === null) return null;

  let odd: ListNode = head;
  let even: ListNode | null = head.next;
  const evenHead: ListNode | null = head.next;

  while (even !== null && even.next !== null) {
    odd.next = even.next;
    odd = odd.next!; // guard proves even.next is a node
    even.next = odd.next;
    even = even.next;
  }

  odd.next = evenHead;

  return head;
}
