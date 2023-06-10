export const isArraysArray = (values: Array<unknown>): boolean => {
  if (!Array.isArray(values)) return false;
  return !values.some((value) => !Array.isArray(value));
};

export const isNumbersArray = (values: Array<unknown>): boolean => {
  if (!Array.isArray(values)) return false;
  return !values.some((value) => typeof Number(value) !== 'number' || isNaN(Number(value)));
};

export const isObjectsArray = (values: Array<unknown>): boolean => {
  if (!Array.isArray(values)) return false;
  return !values.some((value) => typeof value !== 'object' || Array.isArray(value));
};

export const isStringsArray = (values: Array<unknown>): boolean => {
  if (!Array.isArray(values)) return false;
  return !values.some((value) => typeof value !== 'string');
};
