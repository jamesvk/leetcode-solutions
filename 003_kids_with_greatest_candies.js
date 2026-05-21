// MY SOLUTION
var kidsWithCandies = function(candies, extraCandies) {
    let maxVal = Math.max(...candies);
    return candies.map(item => item + extraCandies >= maxVal)
};

// TIME: O(n) — two separate O(n) operations (Math.max + map), constants dropped
// SPACE: O(n) — returned boolean array grows proportionally with input size

// OPTIMAL SOLUTION
// Same as above — O(n) is optimal for this problem.
// Every element must be checked at least once so O(n) cannot be improved.
// Cleaner version of the map return — comparison returns boolean directly, no if/else needed.

