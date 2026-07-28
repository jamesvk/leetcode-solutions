/**
 * LeetCode 746 — Min Cost Climbing Stairs
 * ---------------------------------------
 * dp[i] = the minimum cost to REACH position i. Any position is reachable only
 * from one step back or two steps back, so its cost is the cheaper of:
 *   (cost to reach the stair 1 back) + (price to leave that stair)
 *   (cost to reach the stair 2 back) + (price to leave that stair)
 * Each candidate pairs a position's accumulated cost with THAT SAME position's
 * price — dp[k] with cost[k], never dp + dp. Reaching index 0 or 1 is free.
 *
 * Time:  O(n)  — one pass through the array.
 * Space: O(1)  — rolling variables; memory doesn't grow with n.
 *
 * The "top" sits one past the last stair, so the loop runs to i <= cost.length
 * and we return the value for that final position.
 *
 * Two matched-set rules that this problem drills:
 *   - dp[k] pairs with cost[k] (same index) — crossing them gives a wrong answer
 *   - loop bound and return move together: i <= n with `return b`
 */

function minCostClimbingStairs(cost: number[]): number {
  let a: number = 0; // min cost to reach the stair two positions back
  let b: number = 0; // min cost to reach the stair one position back

  for (let i = 2; i <= cost.length; i++) {
    const minCost = Math.min(a + cost[i - 2], b + cost[i - 1]);
    a = b;
    b = minCost;
  }

  return b;
}

/**
 * Array version (clearer, same idea) — write this one when explaining out loud,
 * then note you can reduce to O(1) space since only the last two cells are read:
 *
 * function minCostClimbingStairs(cost: number[]): number {
 *   const n = cost.length;
 *   const dp: number[] = new Array(n + 1);
 *   dp[0] = 0;
 *   dp[1] = 0;
 *   for (let i = 2; i <= n; i++) {
 *     dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2]);
 *   }
 *   return dp[n];
 * }
 */

export { minCostClimbingStairs };
