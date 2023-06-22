import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FORUM_BACKEND_API } from 'constants/forum';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: FORUM_BACKEND_API,
  }),
  tagTypes: ['COMMENTS', 'TOPICS'],
  endpoints: () => ({}),
});
