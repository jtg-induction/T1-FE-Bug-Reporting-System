import { API_PATHS, PUBLIC_MUTATIONS } from 'constant/apiPaths';
import { logout, setCredentials } from 'redux/features/authSlice';
import { RootState } from 'redux/store';
import { ApiResponse } from 'types/common';
import { LoginSignupRefreshResponse } from 'types/common';

import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
    unknown,
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
        const responseData =
            refreshResult.data as ApiResponse<LoginSignupRefreshResponse>;
        if (responseData.success && responseData.data) {
            api.dispatch(setCredentials(responseData.data));
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout());
        }
    }

    return result;
};

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
    tagTypes: ['Projects'],
});
