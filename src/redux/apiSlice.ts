import { apiPaths } from 'constant/apiPaths';
import { ApiResponse, ProjectMember, UserData } from 'types/common';
import {
    LoginData,
    LoginSignupRefreshResponse,
    ProjectCreateData,
    ProjectCreateResponse,
    ProjectListResponse,
    SendVerifyLinkData,
    UpdateUserData,
    UserRegistrationData,
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
    tagTypes: ['Projects', 'ProjectMembers'],
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

        createProject: builder.mutation<
            ProjectCreateResponse[],
            ProjectCreateData
        >({
            query: (data) => ({
                url: apiPaths.projects,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Projects'],
        }),

        getProjects: builder.query<ProjectListResponse, void>({
            query: () => ({
                url: apiPaths.projects,
                method: 'GET',
            }),
            providesTags: ['Projects'],
        }),

        getProject: builder.query<ProjectListResponse, string>({
            query: (projectId) => ({
                url: `${apiPaths.projects}${projectId}/`,
                method: 'GET',
            }),
            providesTags: ['Projects'],
        }),

        updateProject: builder.mutation<
            ProjectListResponse,
            { projectId: string; updateData: Partial<ProjectCreateData> }
        >({
            query: ({ projectId, updateData }) => ({
                url: `${apiPaths.projects}${projectId}/`,
                method: 'PATCH',
                body: updateData,
            }),
            invalidatesTags: ['Projects'],
        }),

        archiveProject: builder.mutation<ApiResponse, string>({
            query: (projectId) => ({
                url: `${apiPaths.projects}${projectId}/archive/`,
                method: 'POST',
            }),
            invalidatesTags: ['Projects'],
        }),
        unarchiveProject: builder.mutation<ApiResponse, string>({
            query: (projectId) => ({
                url: `${apiPaths.projects}${projectId}/unarchive/`,
                method: 'POST',
            }),
            invalidatesTags: ['Projects'],
        }),

        getProjectMembers: builder.query<ProjectMember[], string>({
            query: (projectId) => `projects/${projectId}/members/`,
            providesTags: ['ProjectMembers'],
        }),

        getUsersToInvite: builder.query<UserData[], string>({
            query: (projectId) => `projects/${projectId}/available_members/`,
        }),

        inviteMember: builder.mutation<
            void,
            { projectId: string; user_id: string; role: number }
        >({
            query: ({ projectId, ...body }) => ({
                url: `projects/${projectId}/invite/`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['ProjectMembers'],
        }),
        acceptInvite: builder.mutation<void, string>({
            query: (projectId) => ({
                url: `projects/${projectId}/accept/`,
                method: 'POST',
            }),
            invalidatesTags: ['Projects'],
        }),
        rejectInvite: builder.mutation<void, string>({
            query: (projectId) => ({
                url: `projects/${projectId}/reject/`,
                method: 'POST',
            }),
            invalidatesTags: ['Projects'],
        }),

        changeRole: builder.mutation<
            void,
            { projectId: string; user_id: string; role: number }
        >({
            query: ({ projectId, ...body }) => ({
                url: `projects/${projectId}/role/`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['ProjectMembers'],
        }),
        revokeMember: builder.mutation<
            void,
            { projectId: string; user_id: string }
        >({
            query: ({ projectId, user_id }) => ({
                url: `projects/${projectId}/revoke/`,
                method: 'POST',
                body: { user_id },
            }),
            invalidatesTags: ['ProjectMembers', 'Projects'],
        }),
        getArchivedProjects: builder.query<ProjectListResponse[], void>({
            query: () => ({
                url: 'projects?status=archived',
                method: 'GET',
            }),
            providesTags: ['Projects'],
        }),
    }),
});

export const {
    useLoginMutation,
    useGetMeQuery,
    useLogoutUserMutation,
    useSignupMutation,
    useSendVerifyLinkMutation,
    useGetUserQuery,
    useUpdateUserMutation,
    useCreateProjectMutation,
    useGetProjectsQuery,
    useGetProjectQuery,
    useUpdateProjectMutation,
    useArchiveProjectMutation,
    useUnarchiveProjectMutation,
    useGetProjectMembersQuery,
    useGetUsersToInviteQuery,
    useInviteMemberMutation,
    useAcceptInviteMutation,
    useRejectInviteMutation,
    useChangeRoleMutation,
    useRevokeMemberMutation,
    useGetArchivedProjectsQuery,
} = apiSlice;
