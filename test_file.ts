Consider all the leaves of a binary tree, read left to right — 
that ordered sequence of leaf values is the tree's leaf value sequence. 
Two trees are leaf-similar if their leaf value sequences are identical. 
Given the roots of two trees, return true if they're leaf-similar, else false. 
A leaf is a node with no children. Example: a tree whose leaves read [6, 7, 4, 9, 8] 
is leaf-similar to any other tree whose leaves also read [6, 7, 4, 9, 8], 
regardless of internal shape.

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

    function collectLeaves(node: TreeNode | null, leaves: number[]): void {
        if (!node) return;
        if (!node.left && !node.right) {
            leaves.push(node.val);
        }
        collectLeaves(node.left, leaves)
        collectLeaves(node.right, leaves)
        
    }

    collectLeaves(root1, leaves1);
    collectLeaves(root2, leaves2);

    return leaves1.join(",") === leaves2.join(",");

    // need to return the array comparison
}