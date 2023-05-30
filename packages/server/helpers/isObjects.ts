export const isObjects = (...values: Array<unknown>): boolean => {
    let result = true;
    values.forEach(value => typeof value === 'object' ? '' : result = false);
    return result;
}
