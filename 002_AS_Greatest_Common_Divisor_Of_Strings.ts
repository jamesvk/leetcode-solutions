
Gcd of strings 1071 · TS
/**
 * LeetCode 1071 — Greatest Common Divisor of Strings
 *
 * INTUITION:
 * If two strings share a repeating base unit, then concatenating them in either
 * order produces the same string (it's all copies of the same unit). So the
 * existence check is: str1 + str2 === str2 + str1. If that holds, the largest
 * common divisor string has length gcd(len1, len2), and is just the first that
 * many characters of either string.
 *
 * APPROACH:
 * 1. If str1 + str2 !== str2 + str1, there is no common divisor -> return "".
 * 2. Otherwise compute gcd(str1.length, str2.length) with the Euclidean
 *    algorithm and return str1.slice(0, that length).
 *
 * Euclidean gcd: gcd(a, b) = gcd(b, a % b), repeating until b = 0, then a is
 * the answer. It works because any number dividing both a and b also divides
 * a % b (the remainder inherits the common divisors), so each step shrinks the
 * pair without changing their gcd.
 *
 * TIME COMPLEXITY: O(n)
 *   n = len1 + len2. Building the two concatenations and comparing them is O(n);
 *   the gcd runs in O(log(min(len))) on the lengths (negligible); slice is O(n).
 *
 * SPACE COMPLEXITY: O(n)
 *   str1 + str2 and str2 + str1 are temporary strings of length n — the hidden
 *   allocation. (The gcd helper itself is O(1).)
 */
 
function gcdOfStrings(str1: string, str2: string): string {
  if (str1 + str2 !== str2 + str1) return "";
  const gcdLength = gcd(str1.length, str2.length);
  return str1.slice(0, gcdLength);
}
 
function gcd(a: number, b: number): number {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}
 
export { gcdOfStrings };
 
