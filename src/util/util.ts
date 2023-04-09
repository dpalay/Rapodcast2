/**
 * Fill me with any extra utility functions that you will need.  E.g., capitalizeString, arrayMaxValue, etc.
 */

/**
 *
 * @param array input array of numberse
 * @returns the maximum value of the array.  Equivalent to array.sort().at(-1)
 */
export function arrayMax(array: number[]) {
  return array.reduce((prev, max, i) => (prev > max ? prev : max));
}
