/*
 * ================================================================
 *  LC 1448 — Count Good Nodes in Binary Tree
 *  Section: Binary Tree - DFS
 * ================================================================
 *  Date closed: 10/22/2026
 *  Status: OWNED
 *    - Cold solve + green submit on 10/20 (path-array version).
 *    - 10/22 rewrite (this file's code): wrote it from a blank file,
 *      but repeated the parent-vs-path-max bug from 10/9 and needed
 *      two coached fixes (pass the max down; start at -Infinity).
 *      Green submit 1:50 pm. OWNED stands; RETEST Friday.
 *    - Lines marked (coach-supplied) were written by the coach.
 *
 *  PROBLEM (paraphrased): A node is "good" if no node on the path
 *  from the root down to it has a bigger value. Return how many good
 *  nodes the tree has.
 *
 *  CONSTRAINTS (raw):
 *    - The number of nodes in the binary tree is in the range [1, 10^5].
 *    - Each node's value is between [-10^4, 10^4].
 * ----------------------------------------------------------------
 *  STEP 1: CONSTRAINTS (ritual)
 *    - [1, 10^5] nodes: GIFTS at least one node, and the root is always
 *      good, so the answer is at least 1 (his line: "minimum is 1,
 *      which returns 1"). BANS anything n^2: 10^5 x 10^5 = 10^10.
 *      One pass is required. (bans line coach-supplied)
 *    - Values from -10^4 to 10^4: WARNS that values can be NEGATIVE,
 *      so the starting max can't be 0 — a root of -1 would fail
 *      -1 >= 0. Start at -Infinity. (coach-supplied — this was the
 *      line skipped at the 10/22 rewrite)
 *    - SCALE NOTE (coach-supplied): a tree shaped like a straight line
 *      of 10^5 nodes makes the recursion 10^5 calls deep. That can
 *      overflow the call stack in some environments; an explicit-stack
 *      (iterative) DFS avoids that.
 *
 *  STEP 2: ONE PLAIN SENTENCE
 *    Return the total number of good nodes. (Unit = one good node: a
 *    node whose value is greater than or equal to EVERY node above it
 *    on the path from the root — not just its parent.)
 *    (his unit said "the previous node" — corrected)
 *
 *  STEP 3: PATTERN CUE
 *    Pattern name: carry state down (top-down DFS). (his)
 *    What gets carried: the biggest value seen so far on the path.
 *    Phrase found in the statement: "in the path from root to X there
 *    are no nodes with a value greater than X." (phrase coach-supplied)
 *
 *  INTUITION (coach-supplied)
 *    The key realization is that a node doesn't need the whole path
 *    above it — only the single biggest value on that path.
 *
 *  APPROACH
 *    1. Call a helper with the root and a starting max of -Infinity,
 *       so the root always counts as good.
 *    2. If the node is null, return 0.
 *    3. If the node's value is greater than or equal to the max so
 *       far, count it (1); otherwise 0.
 *    4. Make a new max: the bigger of the old max and this node's value.
 *    5. Add the helper's answer for the left child and the right child,
 *       each handed the new max.
 *    6. Return the answer.
 *
 *  BUGS CAUGHT (traps — read before Friday's retest)
 *    1. PARENT vs PATH MAX (2nd time: 10/9 and 10/22): passing
 *       root.val down compares each node only to its parent. A node
 *       can beat its parent and still lose to a node higher up.
 *       Convicted by: [9, null, 3, 6] -> returned 2, correct is 1
 *       (6 beats 3 but loses to 9).
 *       Why his own example didn't catch it: in [3,3,null,4,2] every
 *       parent IS the path max, so the bug stays hidden. Pick a test
 *       where a big value sits two levels up.
 *    2. STARTING MAX = 0 with negative values: convicted by root [-1]
 *       -> returned 0, correct is 1.
 *
 *  ROWS
 *    Example: root = [3,3,null,4,2] (his rows; column renamed from
 *    "prev" to "max so far")
 *    curr | max so far | good? | total
 *    3    | -Infinity  | y     | 1
 *    3    | 3          | y     | 2
 *    4    | 3          | y     | 3
 *    2    | 3          | n     | 3
 *    OUTPUT: 3 ✓
 *
 *    Convicting example: root = [9,null,3,6] (coach-supplied)
 *    curr | max so far | good? | total
 *    9    | -Infinity  | y     | 1
 *    3    | 9          | n     | 1
 *    6    | 9          | n     | 1
 *    OUTPUT: 1 ✓
 *
 *  COMPLEXITY (evidence first, then label)
 *    Time — evidence: every node is touched once, with O(1) work at
 *      each. Label: O(n).
 *    Space — evidence (coach-supplied): the call stack holds one call
 *      for each node on the current path from the root, so it grows
 *      with the tree's height, h.
 *      Labels (his): O(h) — O(log n) if the tree is balanced, O(n)
 *      worst case if it is a line.
 * ================================================================
 */

function goodNodes(root: TreeNode | null): number {
  return helper(root, -Infinity);
}

function helper(root: TreeNode | null, max: number): number {
  if (root === null) return 0;

  // Good if I'm at least as big as everything above me
  let answer: number = root.val >= max ? 1 : 0;

  // Hand the biggest-so-far down to my children
  const newMax: number = Math.max(max, root.val);

  answer += helper(root.left, newMax);
  answer += helper(root.right, newMax);

  return answer;
}
