// 1071. Greatest Common Divisor of Strings

// For two strings s and t, we say "t divides s" if and only if s = t + t + t + ... + t + t (i.e., t is concatenated with itself one or more times).

// Given two strings str1 and str2, return the largest string x such that x divides both str1 and str2.

// Example 1:

// Input: str1 = "ABCABC", str2 = "ABC"

// Output: "ABC"

// Example 2:

// Input: str1 = "ABABAB", str2 = "ABAB"

// Output: "AB"

// Example 3:

// Input: str1 = "LEET", str2 = "CODE"

// Output: ""

// Example 4:

// Input: str1 = "AAAAAB", str2 = "AAA"

// Output: ""​​​​​​​

// Constraints:

// 1 <= str1.length, str2.length <= 1000
// str1 and str2 consist of English uppercase letters.

// 1.
// 1 <= str1.length, str2.length <= 1000
// str1 and str2 consist of English uppercase letters.

// 2. Return the largest string that divides both str1 and str2. If no common divisor string exists, return ""

// 3. The patter is the Greedy Running Trackers. We are figuring out if there exists a string that is a common divisor

// 4.

function gcdOfStrings(str1: string, str2: string): string {
  if (str1 + str2 !== str2 + str1) return '';
  let a: number = str1.length;
  let b: number = str2.length;

  while (b !== 0) {
    let c = a % b;
    a = b;
    b = c;
  }

  return str1.slice(0, a);
}
