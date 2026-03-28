import { baseApi } from 'service/baseService/baseApi';
import {
    ApiResponse,
    ProjectSummaryResponse,
    StatusSummary,
    UpdateUserData,
    UserData,
    UserSummaryParams,
} from 'types/common';

import { API_PATHS, HTTP_METHODS } from '@constant';

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query<ApiResponse<UserData>, string>({
            query: (userId) => ({
                url: `${API_PATHS.USERS}${userId}/`,
                method: HTTP_METHODS.GET,
            }),
        }),

        updateUser: builder.mutation<
            ApiResponse<UpdateUserData>,
            { userId: string; updateData: UpdateUserData }
        >({
            query: ({ updateData, userId }) => ({
                url: `${API_PATHS.USERS}${userId}/`,
                method: HTTP_METHODS.PATCH,
                body: updateData,
            }),
        }),

        getMe: builder.query<ApiResponse<UserData>, void>({
            query: () => API_PATHS.ME,
        }),

        getUserSummary: builder.query<
            ApiResponse<ProjectSummaryResponse>,
            UserSummaryParams
        >({
            query: ({ userId, section, startDate, endDate }) => ({
                url: `users/${userId}/user-summary/`,
                params: {
                    section,
                    'start-date': startDate,
                    'end-date': endDate,
                },
            }),
            providesTags: ['UserSummary'],
        }),

        getUserTicketSummary: builder.query<ApiResponse<StatusSummary>, void>({
            query: () => ({
                url: `users/tickets-summary/`,
            }),
            providesTags: ['UserSummary'],
        }),

        downloadUserReport: builder.mutation<
            Blob,
            { userId: string; startDate?: string; endDate?: string }
        >({
            query: ({ userId, startDate, endDate }) => ({
                url: `users/${userId}/report-generate/`,
                method: 'GET',
                params: {
                    'start-date': startDate,
                    'end-date': endDate,
                },
                responseHandler: (response) => response.blob(),
                cache: 'no-cache',
            }),
        }),
    }),
});

export const {
    useGetMeQuery,
    useGetUserQuery,
    useUpdateUserMutation,
    useGetUserSummaryQuery,
    useGetUserTicketSummaryQuery,
    useDownloadUserReportMutation,
} = userApi;
