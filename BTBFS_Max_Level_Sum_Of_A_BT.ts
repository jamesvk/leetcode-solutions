/*
 * ================================================================
 *  LC 1161 — Maximum Level Sum of a Binary Tree
 *  Section: Binary Tree - BFS
 * ================================================================
 *  Date closed: 11/24/2026
 *  Status: GUIDED
 *    - New problem 11/24 (today's one new). Attempted first
 *      (1:57 – 2:18 pm): skeleton right, three bugs — never moved to
 *      the next row (next = children missing -> infinite loop), used
 *      >= on ties, started max at 0.
 *    - Fixes and an Example 1 trace given by the coach at 2:18 pm.
 *      Explained back verbally at 2:22 pm (2 clean, 1 needed a tiny
 *      tree). Four-step close-out written by him at 2:35 pm.
 *    - NOT OWNED: solution seen. COLD SOLVE 11/25, blank file.
 *    - Lines marked (coach-supplied) were written by the coach.
 *
 *  PROBLEM (paraphrased): The root is level 1, its children level 2,
 *  and so on. Return the level whose node values add up to the biggest
 *  sum. If levels tie, return the smallest level number.
 *
 *  CONSTRAINTS (raw):
 *    - The number of nodes in the tree is in the range [1, 10^4].
 *    - -10^5 <= Node.val <= 10^5
 * ----------------------------------------------------------------
 *  STEP 1: CONSTRAINTS (ritual)
 *    - [1, 10^4] nodes: BANS nested loops over the nodes (his):
 *      10^4 x 10^4 = 10^8 steps, too slow; one pass is the target.
 *      (arithmetic coach-supplied)
 *      GIFTS at least one node, so root is never null and level 1
 *      always exists: the answer is at least 1. (his)
 *    - Values -10^5 to 10^5: WARNS values can be negative, so a whole
 *      row's sum can be negative. Max can't start at 0; start at
 *      -Infinity so the first row always wins the first comparison.
 *      (his)
 *      GIFTS a safe sum: the biggest possible total is 10^4 x 10^5 =
 *      10^9, far below JavaScript's safe-integer limit (~9 x 10^15),
 *      so no overflow worries. (coach-supplied)
 *
 *  STEP 2: ONE PLAIN SENTENCE
 *    Return the level number whose row adds up to the biggest sum,
 *    picking the smallest level number on a tie. (Unit = one level
 *    NUMBER, root = 1, not the sum itself.)
 *    (his unit said "the level which holds the maximum value of all
 *    the nodes" — corrected: maximum SUM of the row, not the biggest
 *    single value)
 *
 *  STEP 3: PATTERN CUE
 *    Pattern name: level-order traversal (BFS), two lists.
 *    (coach-supplied — he knew it was Binary Tree - BFS but not the
 *    name)
 *    Phrase found in the statement: "the sum of all the values of
 *    nodes at level x" -> "level" = row = BFS. (coach-supplied)
 *
 *  INTUITION (coach-supplied; his draft: "total the sum of each row
 *  and return the row that has the max value")
 *    The key realization is that "level" just means "row," so this is
 *    199's row-by-row walk with one running total per row.
 *
 *  APPROACH (his, corrected where marked)
 *    1. Set max to -Infinity, answer to 1, and level to 1. (his draft
 *       set answer to -Infinity — corrected: max is -Infinity, answer
 *       starts at 1)
 *    2. Set next to [root], a TreeNode array (his draft said "numbers
 *       array" — corrected), since the root is the whole first row.
 *    3. While next has nodes:
 *       a. Make an empty children array and set sum to 0.
 *       b. For each node in next: add its value to sum, then push its
 *          left child and right child into children if they exist.
 *       c. If sum is greater than max (strictly greater, so ties keep
 *          the earlier, smaller level): max = sum, answer = level.
 *       d. Set next = children (move down one row), then level++.
 *    4. Return answer.
 *
 *  BUGS CAUGHT (traps — read before the 11/25 cold solve)
 *    1. NEVER MOVED DOWN A ROW: missing next = children, so next never
 *       changed and the loop never ended.
 *    2. >= ON TIES: a later row with the same sum stole the win.
 *       "Smallest level" = smallest NUMBER = closest to the top.
 *       Use >.
 *    3. MAX STARTED AT 0: convicted by [-1,-2,-3] — row sums are -1
 *       and -5, neither beats 0, so the answer was never set.
 *       Start at -Infinity.
 *
 *  ROWS
 *    Unit: one level number (root = 1).
 *    Example 1: root = [1,7,0,7,-8,null,null]
 *    level | row     | sum | max -> answer
 *    1     | [1]     | 1   | 1 -> 1
 *    2     | [7, 0]  | 7   | 7 -> 2
 *    3     | [7, -8] | -1  | stays 7 -> 2
 *    OUTPUT: 2 ✓
 *
 *    Convicting example: root = [-1,-2,-3] (coach-supplied)
 *    level | row      | sum | max -> answer
 *    1     | [-1]     | -1  | -1 -> 1
 *    2     | [-2, -3] | -5  | stays -1 -> 1
 *    OUTPUT: 1 ✓ (with max = 0 it would never update)
 *
 *  COMPLEXITY (evidence first, then label)
 *    Time — evidence (his count, coach-finished): each node is pushed
 *      once, read once, added to sum once, and has its left and right
 *      checked: about 5 steps x n nodes = 5n. Each row adds a few
 *      fixed steps (compare sum to max, maybe two assignments,
 *      next = children, level++): about 4 per row, and there are never
 *      more rows than nodes, so at most 4n. Total at most 9n.
 *      Why 9n becomes n (coach-supplied): double the nodes and 9n
 *      doubles too. The work grows in a straight line with n; the 9
 *      only says how steep the line is, and Big-O ignores steepness.
 *      Label: O(n).
 *    Space — evidence (his, one word corrected): at its fattest
 *      moment, next holds one row and children holds the row below
 *      it, about 2w, where w = the WIDEST row. sum, max, level and
 *      answer are single numbers that get overwritten: O(1).
 *      Label: O(w), which is O(n) in the worst case.
 * ================================================================
 */

function maxLevelSum(root: TreeNode | null): number {
  let answer: number = 1;
  let max: number = -Infinity;
  let level: number = 1;

  // Constraints guarantee at least one node, so root is never null
  let next: TreeNode[] = [root!];

  while (next.length) {
    const children: TreeNode[] = [];
    let sum: number = 0;

    // Add up this row and collect the row below it, left to right
    for (const node of next) {
      sum += node.val;
      if (node.left) children.push(node.left);
      if (node.right) children.push(node.right);
    }

    // Strictly greater: on a tie, the earlier (smaller) level keeps it
    if (sum > max) {
      max = sum;
      answer = level;
    }

    // Move down one row
    next = children;
    level++;
  }

  return answer;
}
