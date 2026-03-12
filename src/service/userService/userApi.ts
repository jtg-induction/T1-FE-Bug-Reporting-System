import { baseApi } from 'service/baseService/baseApi';
import { ApiResponse, UpdateUserData, UserProfileData } from 'types/common';

import { API_PATHS } from '@constant';

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query<ApiResponse<UserProfileData>, string>({
            query: (userId) => ({
                url: `${API_PATHS.USERS}${userId}/`,
                method: 'GET',
            }),
        }),

        updateUser: builder.mutation<
            ApiResponse<UpdateUserData>,
            { userId: string; updateData: UpdateUserData }
        >({
            query: ({ updateData, userId }) => ({
                url: `${API_PATHS.USERS}${userId}/`,
                method: 'PUT',
                body: updateData,
            }),
        }),
        getMe: builder.query<ApiResponse<UserProfileData>, void>({
            query: () => API_PATHS.ME,
        }),
    }),
});

export const { useGetMeQuery, useGetUserQuery, useUpdateUserMutation } =
    userApi;
