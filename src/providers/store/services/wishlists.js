import { api } from './api';

export const wishlistsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getWishlistProducts: build.query({
      query: (params = {}) => {
        return {
          url: '/wishlists',
          method: 'GET',
          params,
          credentials: 'include',
        };
      },
      providesTags: (result) => {
        const products = result?.products || [];
        return [
          ...products.map(({ _id }) => ({ type: 'Wishlists', id: _id })),
          { type: 'Wishlists', id: 'LIST' },
        ];
      },
    }),
    updateWishlist: build.mutation({
      query: (id) => {
        return {
          url: `/wishlists/${id}`,
          method: 'POST',
          body: {},
          credentials: 'include',
        };
      },
      invalidatesTags: (response) => {
        const products = response?.products || [];
        return [
          ...products.map(({ _id }) => ({ type: 'Wishlists', id: _id })),
          { type: 'Wishlists', id: 'LIST' },
        ];
      },
    }),
  }),
});

export const { useGetWishlistProductsQuery, useUpdateWishlistMutation } =
  wishlistsApi;
