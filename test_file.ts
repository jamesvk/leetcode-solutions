function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null,
): TreeNode | null {
  let answer: TreeNode | null = null;

  function helper(node: TreeNode | null) {
    if (node === null) return { hasP: false, hasQ: false };

    const left: { hasP: boolean; hasQ: boolean } = helper(node.left);
    const right: { hasP: boolean; hasQ: boolean } = helper(node.right);

    let hasP: boolean = node === p || left.hasP || right.hasP;
    let hasQ: boolean = node === q || left.hasQ || right.hasQ;

    if (hasP && hasQ && answer === null) answer = node;

    return { hasP, hasQ };
  }

  helper(root);
  return answer;
}
