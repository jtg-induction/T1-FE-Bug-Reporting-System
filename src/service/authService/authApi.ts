import { baseApi } from 'service/baseService/baseApi';
import {
    ApiResponse,
    LoginData,
    LoginSignupRefreshResponse,
    SendVerifyLinkData,
    UserRegistrationData,
} from 'types/common';

import { apiPaths } from '@constant';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<
            ApiResponse<LoginSignupRefreshResponse>,
            LoginData
        >({
            query: (credentials) => ({
                url: apiPaths.login,
                method: 'POST',
                body: credentials,
            }),
        }),

        signup: builder.mutation<
            ApiResponse<LoginSignupRefreshResponse>,
            UserRegistrationData
        >({
            query: (data) => ({
                url: apiPaths.register,
                method: 'POST',
                body: data,
            }),
        }),

        logoutUser: builder.mutation<ApiResponse<null>, void>({
            query: () => ({
                url: apiPaths.logout,
                method: 'POST',
            }),
        }),

        sendVerifyLink: builder.mutation<
            ApiResponse<SendVerifyLinkData>,
            SendVerifyLinkData
        >({
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
