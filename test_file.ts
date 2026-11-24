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

function maxLevelSum(root: TreeNode | null): number {
  let answer: number = 0;
  let max: number = -Infinity;
  let level: number = 1;

  let next: TreeNode[] = [root];

  while (next.length) {
    const children: TreeNode[] = [];
    let sum: number = 0;

    for (const node of next) {
      sum += node.val;
      if (node.left) children.push(node.left);
      if (node.right) children.push(node.right);
    }

    if (sum > max) {
      max = sum;
      answer = level;
    }
    next = children;

    level++;
  }

  return answer;
}
