import { AxiosError } from 'axios';

declare global {
  type LocaleType = 'en' | 'ru';
  type Nullable<T> = T | null;
  type ServerError = AxiosError<{ reason: string }>;

  type Keys<T extends Record<string, unknown>> = keyof T;
  type Values<T extends Record<string, unknown>> = T[Keys<T>];
}
declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

export {};
