/*
 * ============================================================
 *  LC 236 — Lowest Common Ancestor of a Binary Tree
 *  Section: Binary Tree - DFS
 * ============================================================
 *  Date closed: 10/26/2026
 *  Status: GUIDED
 *    - Fri 10/23: comprehension landed (nine Example 2 rows), no code.
 *    - Mon 10/26 cold, 30 min, delivered on the buzzer: design PASS
 *      (child reports by return, caught in L/R, answer set once),
 *      code FAIL — three bugs (answer undefined not null; base case
 *      returned nothing; each flag asked only one child).
 *    - Same-sitting revision: two more bugs (helper read the outer
 *      `root` instead of its own `node`; right.hasQ twice, no left).
 *    - Attestation: blank file; disclosed AI questions on object
 *      return-value mechanics (not the solution); CLEAN not stated.
 *    - Next-day cold (Tue 10/27) from a blank file = ownership.
 *
 *  PROBLEM
 *    Given a binary tree and two nodes p and q that are in it,
 *    return the lowest node that has both p and q underneath it
 *    (a node counts as its own descendant).
 *
 *  CONSTRAINTS (raw)
 *    - number of nodes in [2, 10^5]
 *    - -10^9 <= Node.val <= 10^9
 *    - all Node.val are unique
 *    - p != q
 *    - p and q exist in the tree
 *
 *  STEP 1: CONSTRAINTS (ritual)
 *    - 10^5 nodes  -> BANS nested loops (10^5 x 10^5 = 10^10);
 *                     one pass over the tree, ~10^5 touches, fits.
 *    - vals unique -> PERMITS comparing nodes by identity (=== on the
 *                     node object); no two nodes can be confused.
 *    - p != q      -> GIFT: never looking for the same node twice.
 *    - p and q exist -> GIFT: no "not found" branch, no guard code;
 *                     the answer is guaranteed to be set.
 *
 *  STEP 0: UNIT
 *    The unit is a NODE. We return a node, not a count.
 *
 *  STEP 2: ONE PLAIN SENTENCE
 *    [OWED — not produced in sitting; fill at EOD slot]
 *    (Unit = node.)
 *
 *  STEP 3: PATTERN CUE
 *    Binary Tree - DFS, bottom-up ("ask the children, combine").
 *    Phrase found in the statement: "lowest common ancestor" /
 *    "two given nodes".
 *    (In sitting he gave the pattern name in the phrase slot — the
 *     statement words above are the correction.)
 *
 *  INTUITION
 *    His: "travel down all the way to the leaves, check whether they
 *    are p and q, and pass that information back up."
 *    Fixed form: The key realization is that the answer is the first
 *    node, coming up from the bottom, that has p on one side and q on
 *    the other, or is one of them itself.
 *
 *  APPROACH (his prose, numbered)
 *    1. Walk down to the leaves with a helper.
 *    2. At each node, ask both children: did you see p? did you see q?
 *       Each child answers by RETURN VALUE, as a pair of flags.
 *    3. Combine: this node "has p" if it is p, or either child has p.
 *       Same for q. Both children must be asked for both flags.
 *    4. The first node (coming back up) where both flags are true is
 *       the answer. Set it once; the guard keeps higher nodes from
 *       overwriting it.
 *    5. Pass this node's two flags up to its parent.
 *
 *  STEP 0 ROWS — Example 2: p = 5, q = 4, expected 5
 *    (post-order: children before parent)
 *    His rows, corrected where marked.
 *
 *    node | hasP | hasQ | answer
 *    -----+------+------+--------
 *      6  |  n   |  n   |  null
 *      7  |  n   |  n   |  null
 *      4  |  n   |  y   |  null     (he wrote n — 4 IS q)
 *      2  |  n   |  y   |  null     (he wrote n — 4 sits under 2)
 *      5  |  y   |  y   |  5        <- set once here
 *      0  |  n   |  n   |  5
 *      8  |  n   |  n   |  5
 *      1  |  n   |  n   |  5
 *      3  |  y   |  y   |  5        (row missing in sitting; guard
 *                                    holds, answer stays 5)
 *
 *  COMPLEXITY (evidence first, then label)
 *    Time:  every node is touched once (one visit, two child asks,
 *           constant work) -> O(n).
 *    Space: the recursion stack is as deep as the tree is tall ->
 *           O(h). Balanced tree: h = log n. Skewed tree: h = n.
 *           (Output is one node reference — not counted.)
 *
 *  TRAPS (10/26)
 *    - `let answer: T | null;` is undefined, not null -> `=== null`
 *      guard never fires. Initialize `= null`. (card #86)
 *    - Base case must return the same shape ({hasP:false, hasQ:false}),
 *      never a bare `return;`. (card #85)
 *    - Each flag ORs BOTH children. "Only left" and "right twice" were
 *      both produced in one sitting. (card #84)
 *    - Helper must read its own parameter (`node`), never the outer
 *      `root`, or it never descends. (card #87)
 * ============================================================
 */

function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null,
): TreeNode | null {
  let answer: TreeNode | null = null;

  function helper(node: TreeNode | null): { hasP: boolean; hasQ: boolean } {
    if (node === null) return { hasP: false, hasQ: false };

    const left = helper(node.left);
    const right = helper(node.right);

    const hasP = node === p || left.hasP || right.hasP;
    const hasQ = node === q || left.hasQ || right.hasQ;

    if (hasP && hasQ && answer === null) answer = node;

    return { hasP, hasQ };
  }

  helper(root);
  return answer;
}
