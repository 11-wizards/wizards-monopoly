import DOMPurify from 'dompurify';

type SanitizedValues<T> = {
  [key in keyof T]: string;
};

export const sanitizeObject = <T extends Record<string, string>>(data: T): SanitizedValues<T> =>
  Object.entries(data).reduce<SanitizedValues<T>>((acc, [key, value]) => {
    acc[key as keyof T] = DOMPurify.sanitize(value);

    return acc;
  }, {} as SanitizedValues<T>);
