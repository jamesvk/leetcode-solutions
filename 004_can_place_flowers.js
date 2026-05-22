// MY SOLUTION
var canPlaceFlowers = function(flowerbed, n) {
    for (let i = 0; i < flowerbed.length; i++) {
        if (n <= 0) return true  // early exit optimization
        if (flowerbed[i] === 0 && 
            (flowerbed[i - 1] === 0 || flowerbed[i - 1] === undefined) && 
            (flowerbed[i + 1] === 0 || flowerbed[i + 1] === undefined)) {
            flowerbed[i] = 1
            n -= 1
        }
    }
    return n <= 0
}

// TIME: O(n) — single pass through array, early exit when n flowers placed
// SPACE: O(1) — array modified in place, no new data structures created

// OPTIMAL SOLUTION
// Same as above — greedy single pass is already optimal
// Key insight: planting greedily (whenever valid) never blocks a better solution
// Early exit added: if n <= 0 before end of array, return true immediately
// Mutating input array in place ensures newly planted flowers visible to next iteration