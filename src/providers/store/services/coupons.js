import { api } from './api';

export const couponsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCoupons: build.query({
      query: (params = {}) => {
        return {
          url: '/coupons',
          method: 'GET',
          params,
          credentials: 'include',
        };
      },
      providesTags: (result) => {
        const coupons = result?.coupons || [];

        return [
          ...coupons.map(({ _id }) => ({ type: 'Coupons', id: _id })),
          { type: 'Coupons', id: 'LIST' },
        ];
      },
    }),
    createCoupon: build.mutation({
      query: (data) => ({
        url: '/coupons',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: [{ type: 'Coupons', id: 'LIST' }],
    }),
    deleteCoupon: build.mutation({
      query(id) {
        return {
          url: `/coupons/${id}`,
          method: 'DELETE',
          credentials: 'include',
        };
      },
      invalidatesTags: (_product, _err, id) => {
        return [{ type: 'Coupons', id }];
      },
    }),
  }),
});

export const {
  useGetCouponsQuery,
  useCreateCouponMutation,
  useDeleteCouponMutation,
} = couponsApi;
