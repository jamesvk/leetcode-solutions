function pathSum(root: TreeNode | null, targetSum: number): number {
  const map = new Map<number, number>([[0, 1]]);
  return helper(root, targetSum, 0, map);
}

function helper(
  root: TreeNode | null,
  targetSum: number,
  total: number,
  map: Map<number, number>,
): number {
  if (root === null) return 0;

  let answer: number = 0;
  if (root.val === targetSum) answer++;

  let newTotal: number = total + root.val;
  let diff: number = newTotal - targetSum;
  if (map.get(diff)) answer++;

  map.set(newTotal, (map.get(newTotal) ?? 0) + 1);

  answer += helper(root.left, targetSum, newTotal, map);
  answer += helper(root.right, targetSum, newTotal, map);

  map.set(newTotal, map.get(newTotal)! - 1);

  return answer;
}
