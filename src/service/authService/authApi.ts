import { baseApi } from 'service/baseService/baseApi';
import {
    ApiResponse,
    LoginData,
    SendVerifyLinkData,
    UserRegistrationData,
} from 'types/common';

import { apiPaths } from '@constant';

export const authApi = baseApi.injectEndpoints({
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
    }),
});

export const {
    useLoginMutation,
    useLogoutUserMutation,
    useSignupMutation,
    useSendVerifyLinkMutation,
} = authApi;
