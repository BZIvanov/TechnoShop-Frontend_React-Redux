import { api } from './api';

export const categoriesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllCategories: build.query({
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
      invalidatesTags: (category) => [
        { type: 'Categories', id: category?._id },
      ],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
