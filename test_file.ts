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

function searchBST(root: TreeNode | null, val: number): TreeNode | null {
  if (root.val === val || root.val === null) return root;

  if (val < root.val) searchBST(root.left, val);
  if (val > root.val) searchBST(root.right, val);

  return null;
}

function searchBST(root: TreeNode | null, val: number): TreeNode | null {
  let returnNode: TreeNode | null = root;

  while (returnNode !== null) {
    if (returnNode.val === val) break;
    if (val > returnNode.val) returnNode = returnNode.right;
    else returnNode = returnNode.left;
  }

  return returnNode;
}
