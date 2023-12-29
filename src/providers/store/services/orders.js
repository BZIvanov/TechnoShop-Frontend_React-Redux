import { api } from './api';

export const ordersApi = api.injectEndpoints({
  endpoints: (build) => ({
    createOrder: build.mutation({
      query: (data) => ({
        url: '/orders',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: [{ type: 'Orders', id: 'LIST' }],
    }),
  }),
});

export const { useCreateOrderMutation } = ordersApi;
