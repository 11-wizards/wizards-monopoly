import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { YANDEX_API_URL } from 'constants/main';

export const yandexApi = createApi({
  reducerPath: 'yandexApi',
  baseQuery: fetchBaseQuery({
    baseUrl: YANDEX_API_URL,
  }),
  endpoints: () => ({}),
});
