function longestZigZag(root: TreeNode | null): number {
  let best: number = 0;

  function helper(
    root: TreeNode | null,
    dir: 'left' | 'right' | null,
    len: number,
  ) {
    if (root === null) return;
    best = Math.max(best, len);
    helper(root.left, 'left', dir === 'right' ? len + 1 : 1);
    helper(root.right, 'right', dir === 'left' ? len + 1 : 1);
  }

  helper(root, null, 0);
  return best;
}
