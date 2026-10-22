/*
 * ================================================================
 *  LC 437 — Path Sum III
 *  Section: Binary Tree - DFS
 * ================================================================
 *  Date closed: 10/22/2026
 *  Status: GUIDED
 *    - Design reproduced COLD from a blank file: running total carried
 *      down, map seeded {0:1}, lookup of (total - target), decrement
 *      on the way back up. (Bar for today met at the design level.)
 *    - Disclosed assist: looked up Map get/set syntax (syntax only).
 *    - Two counting bugs fixed with coaching; full solution requested
 *      at 12:56 pm. Green submit 1:02 pm.
 *    - Next-day cold redo from a blank file owed.
 *
 *  PROBLEM (paraphrased): Count every path in a binary tree whose node
 *  values add up to targetSum. A path must go downward (parent to
 *  child), but it can start and end at any node.
 *
 *  CONSTRAINTS (raw):
 *    - The number of nodes in the tree is in the range [0, 1000].
 *    - -10^9 <= Node.val <= 10^9
 *    - -1000 <= targetSum <= 1000
 * ----------------------------------------------------------------
 *  STEP 1: CONSTRAINTS (ritual)
 *    - Node values can be 0, so we need to account for this: 3-5 and
 *      3-5-0 would be two different paths that hit the target of 8.
 *      (his line)
 *    - [0, 1000] nodes: OWED (bans / permits / warns / gifts?)
 *    - Negative values allowed: OWED
 *    - targetSum can be 0 or negative: OWED
 *
 *  STEP 2: ONE PLAIN SENTENCE
 *    Return the total number of downward paths that add up to the
 *    target sum. (Unit = OWED — name what one "count" is.)
 *
 *  STEP 3: PATTERN CUE
 *    Pattern name: OWED (blank at delivery).
 *    Phrase found in the statement: OWED.
 *
 *  INTUITION
 *    The key realization is that if you know the total distance
 *    traveled, you only need to subtract the target distance and
 *    check whether that difference was already traveled.
 *
 *  APPROACH
 *    1. Use a map to track every total distance traveled so far.
 *       Initialize it with {0:1}.
 *       (His reason: "since that is the starting point." Half right —
 *       the full reason is OWED: what does a path that starts at the
 *       root need to find in the map?)
 *    2. Call a helper with the root, a running total of 0, the target
 *       sum, and the map.
 *    3. At each node, calculate the new total.
 *    4. Calculate the difference (new total - target). LOOK IT UP
 *       FIRST, and add HOW MANY TIMES it was seen.
 *    5. THEN add the new total to the map.
 *    6. answer += helper(left node) and helper(right node).
 *    7. After both children are checked, remove the new total from
 *       the map, since we are going back up the tree.
 *
 *  HIS SUMMARY OF THE FIX (his words, 1:02 pm):
 *    "I'm setting first, so 0:2, making the answer 2 instead of 1.
 *     Always check first, then set."
 *
 *  BUGS CAUGHT (traps — read before the cold redo)
 *    1. SET BEFORE LOOKUP: the node puts its own total in the map,
 *       then finds itself. That counts a path with zero nodes.
 *       Convicted by: root [1], target 0 -> returned 1, correct is 0.
 *    2. answer++ INSTEAD OF ADDING THE COUNT: when zeros or negatives
 *       repeat a total, more than one path ends at the same node.
 *       answer++ adds only 1. Fix: answer += map.get(diff) ?? 0.
 *       Convicted by: tree [0, 0], target 0 -> correct is 3.
 *    3. PATCH ATTEMPT (rejected): adding
 *       "if (root.val === targetSum) answer++" double-counts, because
 *       the {0:1} seed already finds single-node paths.
 *       On [0, 0], target 0 -> returned 4, correct is 3.
 *
 *  ROWS (Example 1, target 8 — his rows, new map key only per row)
 *    curr | total | diff | added    | found
 *    10   | 10    | 2    | {10:1}   | no
 *    5    | 15    | 7    | {15:1}   | no
 *    3    | 18    | 10   | {18:1}   | yes
 *    3    | 21    | 13   | {21:1}   | (not written)
 *         |       |      | 21 removed
 *    -2   | 19    | 11   | {19:1}   | no
 *    Rows to the output (3): NOT PRODUCED. Owed.
 *
 *  COMPLEXITY (evidence first, then label)
 *    Time — evidence: every node is visited once, and each map
 *      lookup or update is O(1) on average. Label: O(n).
 *    Space — evidence (coach-supplied): the map holds one total for
 *      each node on the CURRENT path from the root, because totals are
 *      removed on the way back up. The recursion stack is the same
 *      size. So space grows with the tree's height, h.
 *      Labels (his, 1:08 pm): O(h) — O(log n) for a balanced tree,
 *      O(n) worst case (a tree shaped like a straight line).
 * ================================================================
 */

function pathSum(root: TreeNode | null, targetSum: number): number {
  const map = new Map<number, number>([[0, 1]]);
  return helper(root, targetSum, 0, map);
}

function helper(
  root: TreeNode | null,
  targetSum: number,
  total: number,
  map: Map<number, number>,
): number {
  if (root === null) return 0;

  const newTotal: number = total + root.val;
  const diff: number = newTotal - targetSum;

  // 1. LOOK first: count every earlier total equal to diff
  let answer: number = map.get(diff) ?? 0;

  // 2. THEN add my own total
  map.set(newTotal, (map.get(newTotal) ?? 0) + 1);

  // 3. Go down both sides
  answer += helper(root.left, targetSum, newTotal, map);
  answer += helper(root.right, targetSum, newTotal, map);

  // 4. Remove my total on the way back up
  map.set(newTotal, map.get(newTotal)! - 1);

  return answer;
}
