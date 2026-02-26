import { apiPaths } from 'constant/apiPaths';
import { ApiResponse } from 'types/common';
import {
    LoginData,
    LoginSignupRefreshResponse,
    SendVerifyLinkData,
    UserRegistrationData,
    VerifyLinkData,
} from 'types/common';

import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { logout, setCredentials } from './features/authSlice';
import type { RootState } from './store';

const publicRoutes = ['login', 'verifyLink', 'signup', 'sendVerifyLink'];

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
    ApiResponse,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error?.status === 401 && !publicRoutes.includes(api.endpoint)) {
        const refreshResult = await baseQuery(
            { url: apiPaths.refresh, method: 'POST' },
            api,
            extraOptions,
        );

        if (refreshResult.data) {
            const authResponse = refreshResult as ApiResponse;
            api.dispatch(
                setCredentials(authResponse.data as LoginSignupRefreshResponse),
            );
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
        login: builder.mutation<ApiResponse, LoginData>({
            query: (credentials) => ({
                url: apiPaths.login,
                method: 'POST',
                body: credentials,
            }),
        }),

        signup: builder.mutation<ApiResponse, UserRegistrationData>({
            query: (data) => ({
                url: apiPaths.register,
                method: 'POST',
                body: data,
            }),
        }),

        getMe: builder.query<ApiResponse, void>({
            query: () => apiPaths.me,
        }),

        logoutUser: builder.mutation<ApiResponse, void>({
            query: () => ({
                url: apiPaths.logout,
                method: 'POST',
            }),
        }),

        sendVerifyLink: builder.mutation<ApiResponse, SendVerifyLinkData>({
            query: (data) => ({
                url: apiPaths.generateEmailLink,
                method: 'POST',
                body: data,
            }),
        }),

        verifyLink: builder.mutation<ApiResponse, VerifyLinkData>({
            query: (data) => ({
                url: `${apiPaths.verifyLink}?${new URLSearchParams({
                    token: data.token,
                    email: data.email,
                }).toString()}`,
                method: 'POST',
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useGetMeQuery,
    useLogoutUserMutation,
    useSignupMutation,
    useSendVerifyLinkMutation,
    useVerifyLinkMutation,
} = apiSlice;
