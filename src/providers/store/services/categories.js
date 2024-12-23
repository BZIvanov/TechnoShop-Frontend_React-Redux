import { api } from './api';

export const categoriesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query({
      query: () => {
        return {
          url: '/categories',
          method: 'GET',
        };
      },
      providesTags: (result) => {
        return [
          ...result.categories.map(({ _id }) => ({
            type: 'Categories',
            id: _id,
          })),
          { type: 'Categories', id: 'LIST' },
        ];
      },
    }),
    getCategory: build.query({
      query: (id) => {
        return {
          url: `/categories/${id}`,
          method: 'GET',
        };
      },
      providesTags: (_result, _error, payload) => {
        return [{ type: 'Categories', id: payload }];
      },
    }),
    createCategory: build.mutation({
      query: (data) => {
        return {
          url: '/categories',
          method: 'POST',
          body: data,
          credentials: 'include',
        };
      },
      invalidatesTags: () => {
        return [{ type: 'Categories', id: 'LIST' }];
      },
    }),
    updateCategory: build.mutation({
      query: (data) => {
        const { id, formData } = data;

        return {
          url: `/categories/${id}`,
          method: 'PATCH',
          body: formData,
          credentials: 'include',
        };
      },
      invalidatesTags: (_result, _error, payload) => {
        return [{ type: 'Categories', id: payload.id }];
      },
    }),
    deleteCategory: build.mutation({
      query: (id) => {
        return {
          url: `/categories/${id}`,
          method: 'DELETE',
          credentials: 'include',
        };
      },
      invalidatesTags: (_result, _error, payload) => {
        return [
          { type: 'Categories', id: payload },
          { type: 'Subcategories', id: 'LIST' },
        ];
      },
    }),
    getCategorySubcategories: build.query({
      query: (id) => {
        return {
          url: `/categories/${id}/subcategories`,
          method: 'GET',
        };
      },
      providesTags: (result) => {
        return [
          ...result.subcategories.map(({ _id }) => ({
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
