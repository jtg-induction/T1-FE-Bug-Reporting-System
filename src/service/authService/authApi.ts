import { baseApi } from 'service/baseService/baseApi';
import {
    ApiResponse,
    LoginData,
    LoginSignupRefreshResponse,
    UserRegistrationData,
    VerifyLinkData,
} from 'types/common';

import { API_PATHS, HTTP_METHODS } from '@constant';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<
            ApiResponse<LoginSignupRefreshResponse>,
            LoginData
        >({
            query: (credentials) => ({
                url: API_PATHS.LOGIN,
                method: HTTP_METHODS.POST,
                body: credentials,
            }),
        }),

        signup: builder.mutation<
            ApiResponse<LoginSignupRefreshResponse>,
            UserRegistrationData
        >({
            query: (data) => ({
                url: API_PATHS.REGISTER,
                method: HTTP_METHODS.POST,
                body: data,
            }),
        }),

        logoutUser: builder.mutation<ApiResponse<null>, void>({
            query: () => ({
                url: API_PATHS.LOGOUT,
                method: HTTP_METHODS.POST,
            }),
        }),

        generateEmailLink: builder.mutation<ApiResponse<null>, VerifyLinkData>({
            query: (data) => ({
                url: API_PATHS.GENERATE_EMAIL_LINK,
                method: HTTP_METHODS.POST,
                body: data,
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useLogoutUserMutation,
    useSignupMutation,
    useGenerateEmailLinkMutation,
} = authApi;
