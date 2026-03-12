import {
    ApiResponse,
    GenerateEmailLinkData,
    LoginData,
    LoginSignupRefreshResponse,
    UserData,
    UpdateUserData,
    UserRegistrationData,
} from 'types/common';

import { API_PATHS, PUBLIC_MUTATIONS } from '@constant';
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ReauthApiResponse } from './apislice.types';
import { logout, setCredentials } from './features/authSlice';
import type { RootState } from './store';

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL as string,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.access;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    ReauthApiResponse,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (
        result.error?.status === 401 &&
        !PUBLIC_MUTATIONS.includes(api.endpoint)
    ) {
        const refreshResult = await baseQuery(
            { url: API_PATHS.REFRESH, method: 'POST' },
            api,
            extraOptions,
        );

        if (refreshResult.data) {
            const authResponse = refreshResult as ReauthApiResponse;
            api.dispatch(setCredentials(authResponse.data));
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout());
        }
    }

    return result;
};

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        login: builder.mutation<
            ApiResponse<LoginSignupRefreshResponse>,
            LoginData
        >({
            query: (credentials) => ({
                url: API_PATHS.LOGIN,
                method: 'POST',
                body: credentials,
            }),
        }),

        signup: builder.mutation<ApiResponse<UserData>, UserRegistrationData>({
            query: (data) => ({
                url: API_PATHS.REGISTER,
                method: 'POST',
                body: data,
            }),
        }),

        getMe: builder.query<ApiResponse<UserData>, void>({
            query: () => API_PATHS.ME,
        }),

        logoutUser: builder.mutation<ApiResponse<void>, void>({
            query: () => ({
                url: API_PATHS.LOGOUT,
                method: 'POST',
            }),
        }),

        generateEmailLink: builder.mutation<
            ApiResponse<void>,
            GenerateEmailLinkData
        >({
            query: (data) => ({
                url: API_PATHS.GENERATE_EMAIL_LINK,
                method: 'POST',
                body: data,
            }),
        }),

        getUser: builder.query<ApiResponse, string>({
            query: (userId) => ({
                url: `${API_PATHS.USERS}${userId}/`,
                method: 'GET',
            }),
        }),

        updateUser: builder.mutation<
            ApiResponse,
            { userId: string; updateData: UpdateUserData }
        >({
            query: ({ updateData, userId }) => ({
                url: `${API_PATHS.USERS}${userId}/`,
                method: 'PUT',
                body: updateData,
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useGetMeQuery,
    useLogoutUserMutation,
    useSignupMutation,
    useGenerateEmailLinkMutation,
    useGetUserQuery,
    useUpdateUserMutation,
} = apiSlice;
