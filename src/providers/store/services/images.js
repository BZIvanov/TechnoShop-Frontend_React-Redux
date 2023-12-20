import { api } from './api';

export const imagesApi = api.injectEndpoints({
  endpoints: (build) => ({
    uploadImage: build.mutation({
      query: (data) => {
        return {
          url: '/images/upload',
          method: 'POST',
          body: data,
          credentials: 'include',
        };
      },
    }),
  }),
});

export const { useUploadImageMutation } = imagesApi;
