export const isNumbers = (...values: Array<unknown>): boolean => {
  let result = true;
  values.forEach((value) =>
    typeof Number(value) === 'number' && !isNaN(Number(value)) ? '' : (result = false),
  );
  return result;
};
