// MY SOLUTION - Approach 1 (Brute Force)
var gcdOfStrings = function(str1, str2) {
    let shorter = str1.length <= str2.length ? str1 : str2
    
    for (let i = shorter.length; i >= 1; i--) {
        let base = shorter.slice(0, i)
        if (isValid(base, str1) && isValid(base, str2)) {
            return base
        }
    }
    return ""
}

function isValid(base, str) {
    if (str.length % base.length !== 0) return false
    let times = str.length / base.length
    return base.repeat(times) === str
}

// TIME: O(min(m,n) × (m+n)) — outer loop runs min(m,n) times, each iteration does O(m+n) work
// SPACE: O(min(m,n)) — base is the only variable that grows, max size is shorter string length

// OPTIMAL SOLUTION - Approach 2 (Mathematical GCD)
var gcdOfStrings = function(str1, str2) {
    if (str1 + str2 !== str2 + str1) return ""
    let gcdLength = gcd(str1.length, str2.length)
    return str1.slice(0, gcdLength)
}

function gcd(a, b) {
    while (b !== 0) {
        let temp = b
        b = a % b
        a = temp
    }
    return a
}

// TIME: O(m+n) — string concatenation comparison dominates
// SPACE: O(m+n) — two concatenated strings stored in memory for comparison