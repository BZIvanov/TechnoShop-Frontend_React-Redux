import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3100/v1',
});

export const api = createApi({
  baseQuery,
  tagTypes: ['Users', 'Categories'],
  endpoints: () => ({}),
});
