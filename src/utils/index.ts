/**
 * Check if a string is a number
 *
 * @param {string} value The string value
 * @return {boolean}
 */
export function isNumber(value: string): boolean {
    if (value.trim() === '') return false
    return !Number.isNaN(Number(value))
}
