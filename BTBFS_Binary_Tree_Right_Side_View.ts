/*
 * ================================================================
 *  LC 199 — Binary Tree Right Side View
 *  Section: Binary Tree - BFS
 * ================================================================
 *  Date closed: 11/24/2026
 *  Status: GUIDED
 *    - Cold attempt 11/24 from a blank file (11:54 am – 12:10 pm):
 *      stuck at 16 min. Wrote a DFS-style helper, looped over the
 *      queue while pushing onto it (rows never separated), answer
 *      typed TreeNode[] instead of number[], and skipped Step 0.
 *    - Solution shown 12:10 pm (two-list version), with an Example 1
 *      trace. Explained back verbally (3 questions, 2 clean, 1 fixed).
 *    - Retyped from memory, green submit ~12:45 pm.
 *    - NOT OWNED: saw the solution. COLD SOLVE 11/25, blank file,
 *      first item in the DSA block.
 *    - Lines marked (coach-supplied) were written by the coach.
 *
 *  PROBLEM (paraphrased): Stand on the right side of a binary tree.
 *  Return the values of the nodes you can see, from top to bottom.
 *
 *  CONSTRAINTS (raw):
 *    - The number of nodes in the tree is in the range [0, 100].
 *    - -100 <= Node.val <= 100
 * ----------------------------------------------------------------
 *  STEP 1: CONSTRAINTS (ritual)
 *    - [0, 100] nodes: WARNS the tree can be empty, so root can be
 *      null and the answer is []. That's the base case. (his)
 *      PERMITS anything: 100 x 100 = 10^4 steps is tiny, but one pass
 *      (O(n)) is the natural fit. (coach-supplied)
 *    - Values -100 to 100: GIFTS nothing to worry about. Values are
 *      only copied into the answer, never compared, so negatives
 *      don't matter. (coach-supplied)
 *    - INPUT FORMAT NOTE (coach-supplied): the example "root = []"
 *      arrives in code as null, not an empty array. A TreeNode has
 *      no .length, so the check is root === null.
 *
 *  STEP 2: ONE PLAIN SENTENCE
 *    Return an array of the rightmost node's value from each row,
 *    top to bottom. (Unit = one value per ROW, the rightmost one.)
 *
 *  STEP 3: PATTERN CUE
 *    Pattern name: level-order traversal (BFS), two lists.
 *    Phrase found in the statement: "the values of the nodes you can
 *    see ordered from top to bottom" -> one answer per row = rows =
 *    BFS. (phrase coach-supplied)
 *
 *  INTUITION
 *    The key realization is that the rightmost node you can see is
 *    simply the last node in each row, so the job is just to visit the
 *    tree one row at a time. (his: "gather all the nodes of each row and
 *    push the rightmost node's value"; reworded)
 *
 *  APPROACH
 *    1. Declare answer as an empty number[].
 *    2. If root is null, return answer (empty tree, nothing to see).
 *    3. Set queue to [root], since the root is the whole first row.
 *    4. While queue has nodes:
 *       a. Push the value of the LAST node in queue into answer.
 *       b. Make an empty next array. For each node in queue, push its
 *          left child, then its right child (left to right), if they
 *          exist.
 *       c. Set queue = next, which moves down one row.
 *    5. When a row has no children, next is [] and the loop ends.
 *       Return answer.
 *
 *  BUGS CAUGHT (traps — read before the 11/25 cold solve)
 *    1. HELPER FUNCTION = DFS HABIT: BFS needs no helper and no
 *       recursion, just a while loop over rows.
 *    2. NO ROW SPLIT: looping over a list while pushing onto that same
 *       list blends every row together, so "last in row" is lost.
 *       Fix: a SEPARATE next list per row.
 *    3. WRONG ANSWER TYPE: answer holds values (number[]), not nodes.
 *    4. STEP 0 SKIPPED: naming the unit ("one value per row") points
 *       straight at rows.
 *
 *  ROWS
 *    Unit: one value per row, the rightmost one.
 *    Example 1: root = [1,2,3,null,5,null,4]
 *    row | queue  | last -> answer | next
 *    1   | [1]    | 1 -> [1]       | [2, 3]
 *    2   | [2, 3] | 3 -> [1, 3]    | [5, 4]
 *    3   | [5, 4] | 4 -> [1, 3, 4] | []  -> loop ends
 *    OUTPUT: [1, 3, 4] ✓
 *
 *    Example 2: root = [1,null,3]
 *    row | queue | last -> answer | next
 *    1   | [1]   | 1 -> [1]       | [3]
 *    2   | [3]   | 3 -> [1, 3]    | []  -> loop ends
 *    OUTPUT: [1, 3] ✓
 *
 *  COMPLEXITY (evidence first, then label)
 *    Time — evidence (coach-supplied): each node does the same small,
 *      fixed amount of work: pushed into next once, read in the for
 *      loop once, and its left and right children checked. About 4
 *      steps x n nodes = 4n. Each row adds 2 more steps (push into
 *      answer, make a new next), and there are never more rows than
 *      nodes, so at most 2n more. Total at most 6n.
 *      Label: O(n).
 *    Space — evidence (his, one word corrected): at its fattest moment,
 *      queue holds one row and next holds the row below it, so about
 *      2w, where w = the WIDEST row (not always the lowest row).
 *      answer holds one value per row, h values.
 *      Label: O(w) for the lists, O(h) for answer; both O(n) worst
 *      case.
 *    SCALE NOTE (coach-supplied): a row-by-row loop never recurses, so
 *      a very tall tree can't overflow the call stack the way a
 *      recursive DFS can.
 * ================================================================
 */

function rightSideView(root: TreeNode | null): number[] {
  const answer: number[] = [];
  if (root === null) return answer;

  let queue: TreeNode[] = [root];

  while (queue.length) {
    // The last node in this row is the one you see from the right
    answer.push(queue[queue.length - 1].val);

    // Build the next row, left to right
    const next: TreeNode[] = [];
    for (const node of queue) {
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }

    // Move down one row
    queue = next;
  }

  return answer;
}
