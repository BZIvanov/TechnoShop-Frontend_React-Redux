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
    addToWishlist: build.mutation({
      query: (id) => {
        return {
          url: `/wishlists/${id}`,
          method: 'POST',
          body: {},
          credentials: 'include',
        };
      },
      invalidatesTags: () => {
        return [{ type: 'Wishlists', id: 'LIST' }];
      },
    }),
    removeFromWishlist: build.mutation({
      query: (id) => {
        return {
          url: `/wishlists/${id}`,
          method: 'DELETE',
          credentials: 'include',
        };
      },
      invalidatesTags: (response, err, payload) => {
        return [{ type: 'Wishlists', id: payload }];
      },
    }),
  }),
});

export const {
  useGetWishlistProductsQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} = wishlistsApi;
