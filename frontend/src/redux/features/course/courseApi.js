import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseURL } from '../../../utils/baseURL';

// Define the course API using Redux Toolkit Query
const courseApi = createApi({
    // Specify the reducer path for this API
    reducerPath: 'courseApi',
    // Configure the base query for the API with base URL and credentials
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseURL()}/api/course`,
        credentials: 'include',
    }),
    // Define tag types for cache invalidation
    tagTypes: ['Courses'],
    // Define the endpoints for the API
    endpoints: (builder) => ({
        // Query for fetching all courses
        fetchAllCourses: builder.query({
            query: () => ({
                url: "/getallcourse",
                method: "GET",
            }),
            refetchOnMount: true, // Refetch data when the component mounts
            providesTags: ['Courses'], // Provide cache tags for 'Courses'
        }),
        // Query for fetching a single course by ID
        fetchSingleCourse: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: 'Courses', id }],
        }),
        // Query for fetching course details by ID
        fetchCourseById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: "Courses", id }],
        }),
        // Mutation for adding a new course
        AddCourse: builder.mutation({
            query: (newCourse) => ({
                url: '/addNewCourse',
                method: 'POST',
                body: newCourse,
                credentials: "include",
            }),
            invalidatesTags: ['Courses'], // Invalidate cache for 'Courses' tag
        }),
        // Mutation for updating a course by ID
        updateCourse: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/updateCourse/${id}`,
                method: "PATCH",
                body: rest,
                credentials: "include",
            }),
            invalidatesTags: ["Courses"], // Invalidate cache for 'Courses' tag
        }),
        // Mutation for deleting a course by ID
        deleteCourse: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Courses', id }],
        }),
    }),
});

// Export hooks for the defined endpoints
export const {
    useAddCourseMutation,
    useDeleteCourseMutation,
    useUpdateCourseMutation,
    useFetchAllCoursesQuery,
    useFetchSingleCourseQuery,
    useFetchCourseByIdQuery,
} = courseApi;

// Export the API
export default courseApi;
