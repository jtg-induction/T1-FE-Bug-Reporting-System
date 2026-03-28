import { ApiResponse, CommentResponse, PaginatedResponse } from 'types/common';

import { API_PATHS } from '@constant';
import { baseApi } from '@service';

export const commentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProjectComments: builder.query<
            PaginatedResponse<CommentResponse>,
            { projectId: string; ticketId: string }
        >({
            query: ({ projectId, ticketId }) => ({
                url: `${API_PATHS.PROJECTS}${projectId}${API_PATHS.TICKETS}${ticketId}${API_PATHS.COMMENTS}`,
            }),
            providesTags: ['Comments'],
        }),
        createComment: builder.mutation<
            ApiResponse<CommentResponse>,
            {
                data: Record<string, string>;
                projectId: string;
                ticketId: string;
            }
        >({
            query: ({ projectId, ticketId, data }) => ({
                url: `${API_PATHS.PROJECTS}${projectId}${API_PATHS.TICKETS}${ticketId}${API_PATHS.COMMENTS}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Comments'],
        }),
        updateComment: builder.mutation<
            ApiResponse<CommentResponse>,
            {
                data: Record<string, string>;
                projectId: string;
                ticketId: string;
                commentId: string;
            }
        >({
            query: ({ commentId, projectId, ticketId, data }) => ({
                url: `${API_PATHS.PROJECTS}${projectId}${API_PATHS.TICKETS}${ticketId}${API_PATHS.COMMENTS}${commentId}/`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Comments'],
        }),
        deleteComment: builder.mutation<
            ApiResponse<CommentResponse>,
            { projectId: string; ticketId: string; commentId: string }
        >({
            query: ({ projectId, ticketId, commentId }) => ({
                url: `${API_PATHS.PROJECTS}${projectId}${API_PATHS.TICKETS}${ticketId}${API_PATHS.COMMENTS}${commentId}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Comments'],
        }),
    }),
});

export const {
    useCreateCommentMutation,
    useGetProjectCommentsQuery,
    useDeleteCommentMutation,
    useUpdateCommentMutation,
} = commentApi;
