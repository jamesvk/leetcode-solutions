/** 
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * var guess = function(num) {}
 */


function guessNumber(n: number): number {
  let low: number = 1;
  let high: number = n;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (!guess(mid)) return mid;
    if (guess(mid) === -1) high = mid;
    low = mid;
  }
};

 while (low <= high) {
        const mid = Math.floor((low + high) / 2));
        if (!guess(mid)) return mid;
        if (guess(mid) === -1) high = mid;
        low = mid;
    }