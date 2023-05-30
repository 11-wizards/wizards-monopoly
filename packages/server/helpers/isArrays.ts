export const isArrays = (...values: Array<unknown>): boolean => {
    let result = true;
    values.forEach(value => Array.isArray(value) ? '' : result = false);
    return result;
}
