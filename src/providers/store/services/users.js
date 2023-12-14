import { api } from './api';

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation({
      query: (credentials) => ({
        url: '/users/register',
        method: 'POST',
        body: credentials,
      }),
    }),
    login: build.mutation({
      query: (credentials) => ({
        url: '/users/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getCurrentUser: build.query({
      query: () => ({
        url: '/users/current-user',
        keepUnusedDataFor: 5,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetCurrentUserQuery } =
  usersApi;
