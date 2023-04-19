import { AxiosError } from 'axios';

declare global {
  type LocaleType = 'en' | 'ru';
  type Nullable<T> = T | null;
  type ServerError = AxiosError<{ reason: string }>;
}

export {};
