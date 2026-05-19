// MY SOLUTION
var mergeAlternately = function(word1, word2) {
    let length = word1.length > word2.length ? word1.length : word2.length
    let retStr = "";
    for (let i = 0; i < length; i++) {
        let s1 = word1.charAt(i);
        let s2 = word2.charAt(i);
        if (s1) retStr += s1
        if (s2) retStr += s2
    }
    return retStr;
};

// OPTIMAL SOLUTION
var mergeAlternately = function(word1, word2) {
    let i = 0
    let result = ""
    while (i < word1.length || i < word2.length) {
        if (i < word1.length) result += word1[i]
        if (i < word2.length) result += word2[i]
        i++
    }
    return result
}

// TIME: O(n) — loop runs once per character in longer string
// SPACE: O(n) — result string grows with combined input length