import { baseApi } from 'service/baseService/baseApi';
import {
    ApiResponse,
    PaginatedResponse,
    ProjectCreateData,
    ProjectCreateResponse,
    ProjectListResponse,
} from 'types/common';

import { API_PATHS } from '@constant';

export const projectApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createProject: builder.mutation<
            ApiResponse<ProjectCreateResponse>,
            ProjectCreateData
        >({
            query: (data) => ({
                url: API_PATHS.PROJECTS,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Projects'],
        }),

        getProjects: builder.query<
            PaginatedResponse<ProjectListResponse>,
            void
        >({
            query: () => ({
                url: API_PATHS.PROJECTS,
                method: 'GET',
            }),
            providesTags: ['Projects'],
        }),
    }),
});

export const { useCreateProjectMutation, useGetProjectsQuery } = projectApi;
