import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// TODO: Сменить baseUrl
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
  }),
  endpoints: () => ({}),
});
