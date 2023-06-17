import DOMPurify from 'dompurify';

export const sanitizeObject = (data: Record<string, string>) =>
  Object.entries(data).reduce((acc, [key, value]) => {
    acc[key] = DOMPurify.sanitize(value);

    return acc;
  }, {});
