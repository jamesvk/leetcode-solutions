function goodNodes(root: TreeNode | null): number {
  return helper(root, -Infinity);
}

function helper(root: TreeNode | null, max: number): number {
  if (root === null) return 0;
  let answer: number = root.val >= max ? 1 : 0;

  let newMax: number = Math.max(max, root.val);

  answer += helper(root.left, newMax);
  answer += helper(root.right, newMax);

  return answer;
}
