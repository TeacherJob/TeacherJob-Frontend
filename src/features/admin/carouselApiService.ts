import { apiService } from '../api/apiService';

// 1. Define TypeScript types based on your Mongoose schema
export type CarouselSlide = {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  backgroundType: 'image' | 'video';
  backgroundMedia: {
    public_id: string;
    url: string;
  };
  gradient: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
};

// 2. Define API response type for getAll
type GetAllCarouselResponse = {
  data: CarouselSlide[];
  message: string;
};

// 3. Inject carousel endpoints into the base API
export const carouselApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getAllCarouselSlides: builder.query<GetAllCarouselResponse, void>({
      query: () => 'admin/carousel',
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map((slide) => ({
                type: 'CarouselSlide' as const,
                id: slide._id,
              })),
              { type: 'CarouselSlide', id: 'LIST' },
            ]
          : [{ type: 'CarouselSlide', id: 'LIST' }],
    }),

    createCarouselSlide: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: 'admin/carousel',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [{ type: 'CarouselSlide', id: 'LIST' }],
    }),

    updateCarouselSlide: builder.mutation<any, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `admin/carousel/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'CarouselSlide', id },
      ],
    }),

    deleteCarouselSlide: builder.mutation<any, string>({
      query: (id) => ({
        url: `admin/carousel/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'CarouselSlide', id },
        { type: 'CarouselSlide', id: 'LIST' },
      ],
    }),
  }),
});

// 4. Export auto-generated hooks
export const {
  useGetAllCarouselSlidesQuery,
  useCreateCarouselSlideMutation,
  useUpdateCarouselSlideMutation,
  useDeleteCarouselSlideMutation,
} = carouselApi;