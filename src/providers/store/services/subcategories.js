import { api } from './api';

export const subcategoriesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSubcategories: build.query({
      query: () => ({
        url: '/subcategories',
        method: 'GET',
      }),
      transformResponse: (response) => response.subcategories,
      providesTags: (result = []) => {
        return [
          ...result.map(({ _id }) => ({ type: 'Subcategories', id: _id })),
          { type: 'Subcategories', id: 'LIST' },
        ];
      },
    }),
    getSubcategory: build.query({
      query: (id) => ({
        url: `/subcategories/${id}`,
        method: 'GET',
      }),
      transformResponse: (response) => response.subcategory,
      providesTags: (_product, _err, id) => {
        return [{ type: 'Subcategories', id }];
      },
    }),
    createSubcategory: build.mutation({
      query: (data) => ({
        url: '/subcategories',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: [{ type: 'Subcategories', id: 'LIST' }],
    }),
    updateSubcategory: build.mutation({
      query: (data) => {
        const { id, ...body } = data;

        return {
          url: `/subcategories/${id}`,
          method: 'PATCH',
          body,
          credentials: 'include',
        };
      },
      invalidatesTags: (subcategory) => [
        { type: 'Subcategories', id: subcategory?._id },
      ],
    }),
    deleteSubcategory: build.mutation({
      query(id) {
        return {
          url: `/subcategories/${id}`,
          method: 'DELETE',
          credentials: 'include',
        };
      },
      invalidatesTags: (_subcategory, _err, id) => {
        return [{ type: 'Subcategories', id }];
      },
    }),
    getSubcategoryProducts: build.query({
      query: (data) => {
        const { id, ...rest } = data;
        return {
          url: `/subcategories/${id}/products`,
          method: 'GET',
          params: rest,
        };
      },
      providesTags: (result) => {
        return [
          ...result.products.map(({ _id }) => ({
            type: 'SubcategoryProducts',
            id: _id,
          })),
          { type: 'SubcategoryProducts', id: 'LIST' },
        ];
      },
    }),
  }),
});

export const {
  useGetSubcategoriesQuery,
  useGetSubcategoryQuery,
  useCreateSubcategoryMutation,
  useUpdateSubcategoryMutation,
  useDeleteSubcategoryMutation,
  useGetSubcategoryProductsQuery,
} = subcategoriesApi;
