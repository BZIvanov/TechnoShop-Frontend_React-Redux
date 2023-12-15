import { api } from './api';

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation({
      query: (data) => ({
        url: '/users/register',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),
    login: build.mutation({
      query: (data) => ({
        url: '/users/login',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),
    getCurrentUser: build.query({
      query: () => ({
        url: '/users/current-user',
        method: 'GET',
        credentials: 'include', // this is needed for the cookies to be set and sent to the backend
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetCurrentUserQuery } =
  usersApi;
