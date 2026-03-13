import { baseApi } from 'service/baseService/baseApi';
import { ApiResponse, UpdateUserData, UserData } from 'types/common';

import { API_PATHS } from '@constant';

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query<ApiResponse<UserData>, string>({
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
                method: 'PATCH',
                body: updateData,
            }),
        }),
        getMe: builder.query<ApiResponse<UserData>, void>({
            query: () => API_PATHS.ME,
        }),
    }),
});

export const { useGetMeQuery, useGetUserQuery, useUpdateUserMutation } =
    userApi;
