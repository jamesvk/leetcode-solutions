/* ============================================================================
 * PRAMP — Flatten a Dictionary
 * ----------------------------------------------------------------------------
 * Date closed: Wed 9/30/2026
 * Status: GUIDED. Solo window broken at ~11:35 (pseudocode opened; allowed
 *         reference was the cheatsheet only). Guided code typed by James from
 *         a blank file; ran GREEN on both examples at 12:19 after fixing
 *         result[key] -> result[newPath]. Cold solve from a blank file is owed
 *         10/1 (ownership bar).
 *
 * PROBLEM (paraphrased): Given a dictionary whose values are primitives or
 * nested dictionaries, return a flat dictionary keyed by each value's dot-joined
 * path; empty-string keys add no segment and no dot.
 *
 * CONSTRAINTS:
 *   - dict has at least 1 key
 *   - keys never contain "."
 *   - nested dictionaries are never empty
 *   - total primitive values <= 10^4; nesting depth <= 100
 *   - output key order doesn't matter; don't mutate the input
 *
 * STEP 1: CONSTRAINTS (ritual)
 *   - <= 10^4 values        -> PERMITS one visit per value (10^4 ops), and even
 *                              a little extra per key for string building.
 *   - depth <= 100          -> PERMITS recursion: 100 stacked calls is far from
 *                              a stack overflow (~10^4 frames).
 *   - unknown depth         -> BANS nested loops: you can't write one loop per
 *                              level when the number of levels isn't known.
 *   - no empty boxes, no dots in keys, >= 1 key
 *                           -> GIFTS: three edge cases you don't handle.
 *
 * STEP 2: ONE PLAIN SENTENCE
 *   Return a flat object mapping each full dot-joined path to its plain value.
 *   (Unit = one plain value.)
 *
 * STEP 3: PATTERN CUE
 *   Recursive DFS — phrase found: "nested any number of levels deep."
 *
 * INTUITION
 *   The key realization is that a nested dictionary is just a smaller version of
 *   the same problem, so one function can handle every layer as long as each
 *   layer is told the path that led to it.
 *
 * APPROACH
 *   1. Start an empty result object and call the walker on the top dictionary
 *      with an empty path, since nothing sits above the top level.
 *   2. For each key, build the new path: if there is no path yet, it is just the
 *      key; if the key is empty, the path stays the same; otherwise it is the
 *      path, a dot, and the key.
 *   3. If the value is itself a dictionary, call the walker again on it with the
 *      new path (recursive case).
 *   4. Otherwise the value is plain, so write new path -> value into the result
 *      (base case).
 *   5. When the top-level call finishes, return the result.
 *
 * COMPLEXITY (evidence first, then label)
 *   Time:  every key at every level is visited exactly once; N total keys means
 *          N visits (path-string building adds up to the path length per key,
 *          mention only if pushed)                               -> O(N)
 *   Space: the output holds one entry per plain value, O(N); the call stack is
 *          as tall as the deepest nesting D, O(D)                -> O(N + D)
 * ========================================================================== */

type Primitive = string | number | boolean;
type Dict = { [key: string]: Primitive | Dict };
type FlatDict = { [key: string]: Primitive };

function flattenDictionary(dict: Dict): FlatDict {
  const result: FlatDict = {};
  walk(dict, '', result); // start at the top, with no path yet
  return result;
}

function walk(curr: Dict, path: string, result: FlatDict): void {
  for (const key in curr) {
    const value = curr[key];

    const newPath =
      path === ''
        ? key // no path yet: the key IS the path
        : key === ''
          ? path // empty key adds nothing
          : `${path}.${key}`; // normal case

    if (typeof value === 'object') {
      walk(value, newPath, result); // recursive case: go one layer deeper
    } else {
      result[newPath] = value; // base case: plain value, write it down
    }
  }
}

console.log(
  flattenDictionary({
    Key1: '1',
    Key2: { a: '2', b: '3', c: { d: '3', e: { '': '1' } } },
  }),
);
// { Key1: '1', 'Key2.a': '2', 'Key2.b': '3', 'Key2.c.d': '3', 'Key2.c.e': '1' }
console.log(flattenDictionary({ '': { a: '1' }, b: '2' }));
// { a: '1', b: '2' }
