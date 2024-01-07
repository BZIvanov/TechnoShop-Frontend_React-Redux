import { api } from './api';

export const subcategoriesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSubcategories: build.query({
      query: () => {
        return {
          url: '/subcategories',
          method: 'GET',
        };
      },
      providesTags: (result) => {
        return [
          ...result.subcategories.map(({ _id }) => ({
            type: 'Subcategories',
            id: _id,
          })),
          { type: 'Subcategories', id: 'LIST' },
        ];
      },
    }),
    getGroupedSubcategories: build.query({
      query: () => {
        return {
          url: '/subcategories/grouped',
          method: 'GET',
        };
      },
      providesTags: (result) => {
        return [
          ...result.subcategories.map(({ _id }) => ({
            type: 'GroupedSubcategories',
            id: _id,
          })),
          { type: 'GroupedSubcategories', id: 'LIST' },
        ];
      },
    }),
    getSubcategory: build.query({
      query: (id) => {
        return {
          url: `/subcategories/${id}`,
          method: 'GET',
        };
      },
      providesTags: (_result, _error, payload) => {
        return [{ type: 'Subcategories', id: payload }];
      },
    }),
    createSubcategory: build.mutation({
      query: (data) => {
        return {
          url: '/subcategories',
          method: 'POST',
          body: data,
          credentials: 'include',
        };
      },
      invalidatesTags: () => {
        return [
          { type: 'Subcategories', id: 'LIST' },
          { type: 'GroupedSubcategories', id: 'LIST' },
        ];
      },
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
      invalidatesTags: (_result, _error, payload) => {
        return [
          { type: 'Subcategories', id: payload.id },
          { type: 'GroupedSubcategories', id: 'LIST' },
        ];
      },
    }),
    deleteSubcategory: build.mutation({
      query: (id) => {
        return {
          url: `/subcategories/${id}`,
          method: 'DELETE',
          credentials: 'include',
        };
      },
      invalidatesTags: (_result, _error, payload) => {
        return [
          { type: 'Subcategories', id: payload },
          { type: 'GroupedSubcategories', id: 'LIST' },
        ];
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
  useGetGroupedSubcategoriesQuery,
  useGetSubcategoryQuery,
  useCreateSubcategoryMutation,
  useUpdateSubcategoryMutation,
  useDeleteSubcategoryMutation,
  useGetSubcategoryProductsQuery,
} = subcategoriesApi;
