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

/*
bt-bfs
constraints tell us that 0/empty arrays exist (base case)

*/
function rightSideView(root: TreeNode | null): number[] {
  const answer: number[] = [];
  if (root === null) return answer;

  let queue: TreeNode[] = [root];

  while (queue.length) {
    answer.push(queue[queue.length - 1].val);

    const next: TreeNode[] = [];
    for (const node of queue) {
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }

    queue = next;
  }

  return answer;
}
