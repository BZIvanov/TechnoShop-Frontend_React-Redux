import { api } from './api';

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCurrentUser: build.query({
      query: () => ({
        url: '/users/current-user',
        keepUnusedDataFor: 5,
      }),
    }),
  }),
});

export const { useGetCurrentUserQuery } = usersApi;
