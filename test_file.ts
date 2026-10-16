function leafSimilar(root1: TreeNode | null, root2: TreeNode | null): boolean {
  const a: number[] = [];
  const b: number[] = [];
  helper(root1, a);
  helper(root2, b);

  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }

  return true;
}

function helper(root: TreeNode | null, leaves: number[]): void {
  if (root === null) return [];
  const result: number[] = [];

  if (root.left === null && root.right === null) {
    leaves.push(root.val);
    return;
  }
  helper(root.left, leaves);
  helper(root.right, leaves);
}
