import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseURL } from '../../../utils/baseURL';

// Define the authentication API using Redux Toolkit Query
const authApi = createApi({
    // Specify the reducer path for this API
    reducerPath: 'authApi',
    // Configure the base query for the API with base URL and credentials
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseURL()}/api/auth`,
        credentials: 'include'
    }),
    // Define tag types for cache invalidation
    tagTypes: ['Users'],
    // Define the endpoints for the API
    endpoints: (builder) => ({
        // Mutation for registering a new user
        registerUser: builder.mutation({
            query: (newUser) => ({
                url: '/register',
                method: 'POST',
                body: newUser
            })
        }),
        // Mutation for logging in a user
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: "/login",
                method: "POST",
                body: credentials,
            }),
        }),
        // Mutation for logging out a user
        logoutUser: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "POST"
            }),
        }),
        // Query for fetching all users
        getUser: builder.query({
            query: () => ({
                url: "/getalluser",
                method: "GET"
            }),
            refetchOnMount: true, // Refetch data when the component mounts
            invalidatesTags: ['Users'], // Invalidate cache for 'Users' tag
        }),
        // Mutation for deleting a user by ID
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/deleteUser/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Users'], // Invalidate cache for 'Users' tag
        }),
        // Mutation for updating a user's role
        updateRole: builder.mutation({
            query: ({ userId, role }) => ({
                url: `/updateRole/${userId}`,
                method: "PUT",
                body: { role }
            }),
            refetchOnMount: true, // Refetch data when the component mounts
            invalidatesTags: ['Users'], // Invalidate cache for 'Users' tag
        }),
        // Mutation for editing a user's profile
        editProfile: builder.mutation({
            query: (profileData) => ({
                url: `/edit-profile`,
                method: "PATCH",
                body: profileData
            }),
        })
    })
})

// Export hooks for the defined endpoints
export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useGetUserQuery,
    useDeleteUserMutation,
    useEditProfileMutation,
    useUpdateRoleMutation
} = authApi;

// Export the API
export default authApi;
