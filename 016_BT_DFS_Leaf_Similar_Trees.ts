/**
 * LeetCode 872 — Leaf-Similar Trees
 * ---------------------------------
 * Two trees are leaf-similar if their leaves, read left to right,
 * form the same sequence. Collect each tree's leaves via DFS into an
 * array, then compare the sequences.
 *
 * NOTE: This is NOT the most space-optimal solution.
 *   - This version: O(n) time, O(n) space (materializes both full leaf arrays).
 *   - More optimal on space: traverse both trees LAZILY with explicit stacks,
 *     comparing leaves one at a time with early exit on first mismatch.
 *     That drops space to O(h) and can short-circuit. (To be built in a
 *     dedicated session — not yet implemented here.)
 *
 * Solve status: GUIDED (not cold). Re-solve from a blank file to prove ownership.
 * Watch on redo: keep the base case (!node) distinct from the leaf test
 * (!node.left && !node.right) — they are two different checks.
 */

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

function leafSimilar(root1: TreeNode | null, root2: TreeNode | null): boolean {
  const leaves1: number[] = [];
  const leaves2: number[] = [];

  // Void helper + external accumulator: recursion returns nothing;
  // its job is the side effect of filling the array passed to it.
  function collectLeaves(node: TreeNode | null, leaves: number[]): void {
    if (!node) return; // base case: null → stop
    if (!node.left && !node.right) {
      // leaf test: both children null
      leaves.push(node.val);
      return;
    }
    collectLeaves(node.left, leaves); // base case absorbs a null child
    collectLeaves(node.right, leaves);
  }

  collectLeaves(root1, leaves1);
  collectLeaves(root2, leaves2);

  // Can't compare arrays with === (separate objects in memory → compares
  // reference identity, not contents). Join to strings and compare by value.
  // The "," delimiter is required so [1,2] and [12] don't both become "12".
  return leaves1.join(',') === leaves2.join(',');
}

/**
 * Complexity
 *   Time:  O(n1 + n2) = O(n) — every node of both trees is visited once.
 *   Space: O(n) for the leaf arrays + O(h) for the recursion stack.
 *          Since h ≤ n, the array term dominates → O(n).
 *   Time is optimal; space is reducible to O(h) (see NOTE above).
 */

export { leafSimilar, TreeNode };
