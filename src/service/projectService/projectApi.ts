import { baseApi } from 'service/baseService/baseApi';
import {
    ApiResponse,
    PaginatedResponse,
    ProjectCreateData,
    ProjectCreateResponse,
    ProjectListData,
    ProjectListResponse,
    ProjectMemberData,
    ProjectMemberResponse,
    UserData,
} from 'types/common';

import { API_PATHS, HTTP_METHODS } from '@constant';

export const projectApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createProject: builder.mutation<
            ApiResponse<ProjectCreateResponse>,
            ProjectCreateData
        >({
            query: (data) => ({
                url: API_PATHS.PROJECTS,
                method: HTTP_METHODS.POST,
                body: data,
            }),
            invalidatesTags: ['Projects'],
        }),

        getProjects: builder.query<
            PaginatedResponse<ProjectListResponse>,
            ProjectListData
        >({
            query: ({ limit, offset, ordering, filter }) => ({
                url: API_PATHS.PROJECTS,
                params: { limit, offset, ordering, ...filter },
            }),
            providesTags: ['Projects'],
        }),
        getProject: builder.query<ApiResponse<ProjectListResponse>, string>({
            query: (projectId) => ({
                url: `${API_PATHS.PROJECTS}${projectId}/`,
            }),
            providesTags: ['Projects'],
        }),

        updateProject: builder.mutation<
            ProjectListResponse,
            { projectId: string; updateData: Partial<ProjectCreateData> }
        >({
            query: ({ projectId, updateData }) => ({
                url: `${API_PATHS.PROJECTS}${projectId}/`,
                method: HTTP_METHODS.PATCH,
                body: updateData,
            }),
            invalidatesTags: ['Projects'],
        }),

        archiveProject: builder.mutation<ApiResponse<null>, string>({
            query: (projectId) => ({
                url: `${API_PATHS.PROJECTS}${projectId}/archive/`,
                method: HTTP_METHODS.POST,
            }),
            invalidatesTags: ['Projects'],
        }),
        unarchiveProject: builder.mutation<ApiResponse<null>, string>({
            query: (projectId) => ({
                url: `${API_PATHS.PROJECTS}${projectId}/unarchive/`,
                method: HTTP_METHODS.POST,
            }),
            invalidatesTags: ['Projects'],
        }),

        getProjectMembers: builder.query<
            PaginatedResponse<ProjectMemberResponse>,
            ProjectMemberData
        >({
            query: ({ projectId, limit, offset, ordering, filter }) => ({
                url: `${API_PATHS.PROJECTS}${projectId}/members/`,
                params: { limit, offset, ordering, ...filter },
            }),
            providesTags: ['ProjectMembers'],
        }),

        getUsersToInvite: builder.query<ApiResponse<UserData[]>, string>({
            query: (projectId) =>
                `${API_PATHS.PROJECTS}${projectId}/available_members/`,
            providesTags: ['ProjectMembers'],
        }),

        inviteMember: builder.mutation<
            void,
            { projectId: string; user_id: string; role: number }
        >({
            query: ({ projectId, ...body }) => ({
                url: `${API_PATHS.PROJECTS}${projectId}/invite/`,
                method: HTTP_METHODS.POST,
                body,
            }),
            invalidatesTags: ['ProjectMembers'],
        }),
        acceptInvite: builder.mutation<void, string>({
            query: (projectId) => ({
                url: `${API_PATHS.PROJECTS}${projectId}/accept/`,
                method: HTTP_METHODS.POST,
            }),
            invalidatesTags: ['Projects'],
        }),
        rejectInvite: builder.mutation<void, string>({
            query: (projectId) => ({
                url: `${API_PATHS.PROJECTS}${projectId}/reject/`,
                method: HTTP_METHODS.POST,
            }),
            invalidatesTags: ['Projects'],
        }),

        changeRole: builder.mutation<
            void,
            { projectId: string; user_id: string; role: number }
        >({
            query: ({ projectId, ...body }) => ({
                url: `${API_PATHS.PROJECTS}${projectId}/role/`,
                method: HTTP_METHODS.POST,
                body,
            }),
            invalidatesTags: ['ProjectMembers'],
        }),
        revokeMember: builder.mutation<
            void,
            { projectId: string; user_id: string }
        >({
            query: ({ projectId, user_id }) => ({
                url: `${API_PATHS.PROJECTS}${projectId}/revoke/`,
                method: HTTP_METHODS.POST,
                body: { user_id },
            }),
            invalidatesTags: ['ProjectMembers', 'Projects'],
        }),
        getArchivedProjects: builder.query<
            PaginatedResponse<ProjectListResponse>,
            ProjectListData
        >({
            query: ({ limit, offset, ordering, filter }) => ({
                url: `${API_PATHS.PROJECTS}?status=archived`,
                params: { limit, offset, ordering, ...filter },
            }),
            providesTags: ['Projects'],
        }),
    }),
});

export const {
    useCreateProjectMutation,
    useGetProjectsQuery,
    useAcceptInviteMutation,
    useArchiveProjectMutation,
    useChangeRoleMutation,
    useGetArchivedProjectsQuery,
    useGetProjectMembersQuery,
    useGetProjectQuery,
    useGetUsersToInviteQuery,
    useInviteMemberMutation,
    useRejectInviteMutation,
    useRevokeMemberMutation,
    useUnarchiveProjectMutation,
    useUpdateProjectMutation,
} = projectApi;
