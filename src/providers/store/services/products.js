import { api } from './api';

export const productsApi = api.injectEndpoints({
  endpoints: (build) => ({
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
      invalidatesTags: (product) => [{ type: 'Products', id: product?._id }],
    }),
  }),
});

export const {
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
} = productsApi;
