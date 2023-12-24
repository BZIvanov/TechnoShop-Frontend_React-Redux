import { api } from './api';

export const productsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: (params = {}) => ({
        url: '/products',
        method: 'GET',
        params,
      }),
      providesTags: (result) => {
        const products = result?.products || [];

        return [
          ...products.map(({ _id }) => ({ type: 'Products', id: _id })),
          { type: 'Products', id: 'LIST' },
        ];
      },
    }),
    getProduct: build.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'GET',
      }),
      transformResponse: (response) => response.product,
      providesTags: (_product, _err, id) => {
        return [{ type: 'Products', id }];
      },
    }),
    createProduct: build.mutation({
      query: (data) => ({
        url: '/products',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
    updateProduct: build.mutation({
      query: (data) => {
        const { id, ...body } = data;

        return {
          url: `/products/${id}`,
          method: 'PATCH',
          body,
          credentials: 'include',
        };
      },
      invalidatesTags: (product) => {
        return [{ type: 'Products', id: product?._id }];
      },
    }),
    deleteProduct: build.mutation({
      query(id) {
        return {
          url: `products/${id}`,
          method: 'DELETE',
          credentials: 'include',
        };
      },
      invalidatesTags: (_product, _err, id) => {
        return [{ type: 'Products', id }];
      },
    }),
    rateProduct: build.mutation({
      query: (data) => {
        const { id, ...body } = data;

        return {
          url: `/products/${id}/rate`,
          method: 'PATCH',
          body,
          credentials: 'include',
        };
      },
      transformResponse: (response) => response.product,
      invalidatesTags: (product) => {
        return [{ type: 'Products', id: product?._id }];
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useRateProductMutation,
} = productsApi;
