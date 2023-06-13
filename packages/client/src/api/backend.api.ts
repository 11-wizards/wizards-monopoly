import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_TAGS } from 'constants/forum';
import { API_URL } from 'constants/main';

export const backendApi = createApi({
  reducerPath: 'backendApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  tagTypes: [API_TAGS.TOPICS, API_TAGS.COMMENTS],
  endpoints: () => ({}),
});
