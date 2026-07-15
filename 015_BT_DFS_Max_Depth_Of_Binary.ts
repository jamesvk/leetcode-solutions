/**
 * LeetCode 104 — Maximum Depth of Binary Tree
 * https://leetcode.com/problems/maximum-depth-of-binary-tree/
 *
 * Pattern: Binary Tree — DFS (recursion)
 *
 * --- Intuition ---
 * Traverse both branches of each node and return 1 plus the deeper of the two
 * subtree depths. The longest root-to-leaf path bubbles up to the root.
 *
 * --- Approach ---
 * Recursion. Base case: if the node is null, return 0. Otherwise recursively get
 * the depth of the left and right subtrees, and return 1 + the max of those two.
 * The +1 counts the current node; the max picks the longer branch.
 *
 * --- Complexity ---
 * Time: O(n).
 *   Visit every node exactly once; O(1) work per node (one max, one add).
 * Space: O(h), where h = tree height.
 *   The recursion call stack holds one frame per level, from root down to the
 *   current node. Balanced tree -> O(log n); worst-case skewed tree -> O(n).
 *   NOT O(1): each pending recursive call occupies a stack frame until it returns.
 *
 * --- Notes to self ---
 * - Base case is `root === null` -> 0, NOT a leaf check (!left && !right). Don't
 *   hand-catch leaves — let recursion produce them: a leaf computes 1 + max(0,0) = 1
 *   on its own. The null-check also handles the empty tree for free.
 * - THE space-complexity lesson: the recursion call stack IS memory. A paused parent
 *   call sits in memory waiting for its child to return. Depth of recursion = space.
 *   Recursion is never O(1) space.
 * - h vs log n: O(h) is the honest answer. log n only if balanced; n if skewed.
 *   Say "O(h), which is O(log n) balanced, O(n) worst case."
 * - Time sums work over ALL nodes; space measures the PEAK frames alive at once
 *   (only h, the current root-to-node path — completed calls release their memory).
 * - Recursive case: I wrote this line myself. Base case was the fix.
 * - RE-SOLVE COLD tomorrow morning + Friday.
 */

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function maxDepth(root: TreeNode | null): number {
  if (root === null) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
