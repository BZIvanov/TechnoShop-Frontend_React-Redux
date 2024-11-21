import { api } from './api';

export const ordersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBuyerOrders: build.query({
      query: (params = {}) => {
        return {
          url: '/orders',
          method: 'GET',
          params,
          credentials: 'include',
        };
      },
      providesTags: (result) => {
        return [
          ...result.orders.map(({ _id }) => ({ type: 'BuyerOrders', id: _id })),
          { type: 'BuyerOrders', id: 'PARTIAL-LIST' },
        ];
      },
    }),
    getSellerOrders: build.query({
      query: (params = {}) => {
        return {
          url: '/orders/seller',
          method: 'GET',
          params,
          credentials: 'include',
        };
      },
      providesTags: (result) => {
        return [
          ...result.orders.map(({ _id }) => ({
            type: 'SellerOrders',
            id: _id,
          })),
          { type: 'SellerOrders', id: 'PARTIAL-LIST' },
        ];
      },
    }),
    createOrder: build.mutation({
      query: (data) => ({
        url: '/orders',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: () => {
        return [
          { type: 'BuyerOrders', id: 'PARTIAL-LIST' },
          { type: 'SellerOrders', id: 'PARTIAL-LIST' },
        ];
      },
    }),
    updateOrderDeliveryStatus: build.mutation({
      query: (data) => {
        const { id, ...body } = data;

        return {
          url: `/orders/seller/${id}`,
          method: 'PATCH',
          body,
          credentials: 'include',
        };
      },
      invalidatesTags: () => {
        return [
          { type: 'BuyerOrders', id: 'PARTIAL-LIST' },
          { type: 'SellerOrders', id: 'PARTIAL-LIST' },
        ];
      },
    }),
  }),
});

export const {
  useGetBuyerOrdersQuery,
  useGetSellerOrdersQuery,
  useCreateOrderMutation,
  useUpdateOrderDeliveryStatusMutation,
} = ordersApi;
