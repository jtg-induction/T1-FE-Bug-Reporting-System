import { baseApi } from 'service/baseService/baseApi';
import { ApiResponse, UpdateUserData } from 'types/common';

import { apiPaths } from '@constant';

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query<ApiResponse, string>({
            query: (userId) => ({
                url: `${apiPaths.users}${userId}/`,
                method: 'GET',
            }),
        }),

        updateUser: builder.mutation<
            ApiResponse,
            { userId: string; updateData: UpdateUserData }
        >({
            query: ({ updateData, userId }) => ({
                url: `${apiPaths.users}${userId}/`,
                method: 'PUT',
                body: updateData,
            }),
        }),
        getMe: builder.query<ApiResponse, void>({
            query: () => apiPaths.me,
        }),
    }),
});

export const { useGetMeQuery, useGetUserQuery, useUpdateUserMutation } =
    userApi;
