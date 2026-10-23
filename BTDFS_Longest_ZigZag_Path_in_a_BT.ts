/* ============================================================================
   LC 1372 — LONGEST ZIGZAG PATH IN A BINARY TREE        (Binary Tree - DFS)
   ============================================================================
   Date closed: 2026-10-23
   Status: GUIDED
     - 10/20: new; step-0 rows correct, code failed to transcribe; solution handed over
     - 10/23 cold attempt from blank file: stalled (no length parameter, best born
       inside the helper); solution handed over 2:59 pm; viewed again 3:22 pm (disclosed)
     - 10/23 same-sitting redo: code PASS, rows produced
     - Ownership bar: blank-file cold solve, weekend or Monday 10/26

   PROBLEM (paraphrased)
     A zigzag path keeps turning: left, then right, then left... Its length is the
     number of EDGES (arrows) it crosses. Return the length of the longest zigzag
     path anywhere in the tree. A single node has length 0.

   CONSTRAINTS (raw)
     - The number of nodes in the tree is in the range [1, 5 * 10^4].
     - 1 <= Node.val <= 100

   ----------------------------------------------------------------------------
   STEP 1: CONSTRAINTS (ritual)
   ----------------------------------------------------------------------------
     [1, 5*10^4] nodes  -> BANS n^2 (5*10^4 * 5*10^4 = 2.5*10^9). PERMITS one
                           pass: 5*10^4 visits is nothing.
                        -> WARNS: a line-shaped tree is 5*10^4 calls deep; recursion
                           can blow the call stack. Iterative DFS is the safe version.
                        -> GIFTS: at least one node, so root is never null on the
                           first call (the null guard still covers the children).
     Node.val in [1, 100] -> values never matter here; the problem is about the
                           SHAPE (which direction each arrow goes), not the numbers.

   ----------------------------------------------------------------------------
   STEP 2: ONE PLAIN SENTENCE
   ----------------------------------------------------------------------------
     Return the most arrows any path crosses while alternating left-right-left
     (or right-left-right) without ever repeating a direction.  (Unit = edges.)

   ----------------------------------------------------------------------------
   STEP 3: PATTERN CUE
   ----------------------------------------------------------------------------
     Carry state down (Binary Tree - DFS).
     Phrase found in the statement: "change the direction from right to left or
     from left to right ... the length of the path."
     A node can't see which way it was reached or how long the zigzag is so far,
     so both ride down as parameters.

   ----------------------------------------------------------------------------
   INTUITION
   ----------------------------------------------------------------------------
     The key realization is that the longest zigzag ending at any node depends only
     on how that node was reached: a turn makes it one longer, a repeat starts it
     over at one, and the answer is the biggest value seen anywhere, not the value
     at the root.

   ----------------------------------------------------------------------------
   STEP 0 ROWS (produced 10/23; unit line and group labels added at close-out)
   ----------------------------------------------------------------------------
     UNIT = edges.
     Hand-walk of Example 1 to its output: the zigzag right -> left -> right crosses
     three arrows. Output 3.

     Columns, by group:
       WHERE          : node
       TOLD COMING IN : dir (which way I was reached), len (zigzag length so far)
       WORKED OUT HERE: nothing new -- len is already known; the node checks len in
                        against best
       SHARED         : best (belongs to the whole tree)

     node | dir   | len | best
     -----+-------+-----+-----
       1  | null  |  0  |  0
       2  | right |  1  |  1
       3  | left  |  2  |  2
       4  | right |  1  |  2     <- same direction twice: restart at 1
       5  | left  |  2  |  2
       7  | right |  3  |  3     <- answer = biggest number in the len column

     Restart is 1, not 0, because you just crossed an arrow to get here: that arrow
     is the first edge of the new zigzag.

   ----------------------------------------------------------------------------
   APPROACH
   ----------------------------------------------------------------------------
     1. Create best = 0 outside the helper. It belongs to the whole tree.
     2. The helper takes the current node, the direction it was reached by, and
        the zigzag length so far.
     3. At a null node, return. (Unit's zero: no edges here.)
     4. At every real node, check in: best = max(best, len).
     5. Go to the left child with direction "left". If I was reached by "right",
        that's a turn: pass len + 1. Otherwise the zigzag broke: pass 1.
     6. Go to the right child with direction "right", same rule flipped.
     7. Start the helper at the root with no direction and length 0. Both children
        of the root get 1 from the same rule, so the root needs no special case.
     8. Return best.

     Where the +1 lives: the unit is edges, and an edge is added while CROSSING it,
     so the +1 is in the argument handed to the child, not at the node.
     (Nodes -> +1 at the node. Edges -> +1 at the call.)

   ----------------------------------------------------------------------------
   COMPLEXITY (evidence first, then label)
   ----------------------------------------------------------------------------
     Time : every node is visited exactly once and does constant work (one max,
            two calls). n visits -> O(n).
     Space: best is one number, O(1). But every unfinished call sits on the call
            stack, and the stack is as deep as the tree is tall. Height h, up to
            n for a line-shaped tree -> O(h), worst case O(n).
            (10/23 miss: labeled O(1), forgot the call stack.)

   SCALE: 5*10^4 nodes in a line = 5*10^4 recursive calls deep -> can overflow the
   call stack. The scalable version is an iterative DFS with an explicit stack of
   [node, dir, len] triples: same O(n) time, O(h) space, no recursion limit.
   ============================================================================ */

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function longestZigZag(root: TreeNode | null): number {
  let best: number = 0; // belongs to the whole tree -> born once, outside

  function helper(
    node: TreeNode | null,
    dir: 'left' | 'right' | null, // told coming in: which way I was reached
    len: number, // told coming in: zigzag length so far (edges)
  ): void {
    if (node === null) return; // unit's zero: no edges here
    best = Math.max(best, len); // every node checks in
    helper(node.left, 'left', dir === 'right' ? len + 1 : 1); // turn -> +1, else restart
    helper(node.right, 'right', dir === 'left' ? len + 1 : 1);
  }

  helper(root, null, 0);
  return best;
}

// ---- trace receipt (run 10/23 at close-out) --------------------------------
// Example 1: [1,null,1,1,1,null,null,1,1,null,1,null,null,null,1] -> 3   PASS
// Example 2: [1,1,1,null,1,null,null,1,1,null,1]                   -> 4   PASS
// Example 3: [1]                                                   -> 0   PASS
