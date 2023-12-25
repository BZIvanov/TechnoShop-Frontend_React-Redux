import { api } from './api';

export const categoriesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query({
      query: () => ({
        url: '/categories',
        method: 'GET',
      }),
      transformResponse: (response) => response.categories,
      providesTags: (result = []) => {
        return [
          ...result.map(({ _id }) => ({ type: 'Categories', id: _id })),
          { type: 'Categories', id: 'LIST' },
        ];
      },
    }),
    getCategory: build.query({
      query: (id) => ({
        url: `/categories/${id}`,
        method: 'GET',
      }),
      transformResponse: (response) => response.category,
      providesTags: (_product, _err, id) => {
        return [{ type: 'Categories', id }];
      },
    }),
    createCategory: build.mutation({
      query: (data) => ({
        url: '/categories',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: [{ type: 'Categories', id: 'LIST' }],
    }),
    updateCategory: build.mutation({
      query: (data) => {
        const { id, ...body } = data;

        return {
          url: `/categories/${id}`,
          method: 'PATCH',
          body,
          credentials: 'include',
        };
      },
      invalidatesTags: (category) => [
        { type: 'Categories', id: category?._id },
      ],
    }),
    deleteCategory: build.mutation({
      query(id) {
        return {
          url: `/categories/${id}`,
          method: 'DELETE',
          credentials: 'include',
        };
      },
      invalidatesTags: (_category, _err, id) => {
        return [{ type: 'Categories', id }];
      },
    }),
    getCategorySubcategories: build.query({
      query(id) {
        return {
          url: `/categories/${id}/subcategories`,
          method: 'GET',
        };
      },
      transformResponse: (response) => response.subcategories,
      providesTags: (result = []) => {
        return [
          ...result.map(({ _id }) => ({
            type: 'CategorySubcategories',
            id: _id,
          })),
          { type: 'CategorySubcategories', id: 'LIST' },
        ];
      },
    }),
    getCategoryProducts: build.query({
      query: (data) => {
        const { id, ...rest } = data;
        return {
          url: `/categories/${id}/products`,
          method: 'GET',
          params: rest,
        };
      },
      providesTags: (result) => {
        return [
          ...result.products.map(({ _id }) => ({
            type: 'CategoryProducts',
            id: _id,
          })),
          { type: 'CategoryProducts', id: 'LIST' },
        ];
      },
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategorySubcategoriesQuery,
  useGetCategoryProductsQuery,
} = categoriesApi;
