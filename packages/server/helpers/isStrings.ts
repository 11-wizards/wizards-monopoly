export const isStrings = (...values: Array<unknown>): boolean => {
  let result = true;
  values.forEach((value) => (typeof value === 'string' ? '' : (result = false)));
  return result;
};
