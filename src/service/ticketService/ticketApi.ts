import {
    ApiResponse,
    PaginatedResponse,
    ProjectListResponse,
    TicketCreateData,
    TicketCreateResponse,
    TicketDeleteData,
    TicketListData,
} from 'types/common';

import { API_PATHS } from '@constant';
import { baseApi } from '@service';

export const ticketApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserTickets: builder.query<
            PaginatedResponse<TicketCreateResponse>,
            Omit<TicketListData, 'projectId'>
        >({
            query: ({ limit, offset, ordering, filter }) => ({
                url: `${API_PATHS.TICKETS}`,
                params: { limit, offset, ordering, ...filter },
            }),
            serializeQueryArgs: ({ queryArgs }) => ({
                filter: queryArgs.filter,
                ordering: queryArgs.ordering,
            }),
            merge: (currentCache, newItems, { arg }) => {
                if (arg.offset === 0) {
                    return newItems;
                }
                currentCache.data.results.push(...newItems.data.results);
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            },
            providesTags: ['Tickets'],
        }),
        getProjectTickets: builder.query<
            PaginatedResponse<TicketCreateResponse>,
            TicketListData
        >({
            query: ({ projectId, limit, offset, ordering, filter }) => ({
                url: `${API_PATHS.PROJECTS}${projectId}${API_PATHS.TICKETS}`,
                params: { limit, offset, ordering, ...filter },
            }),
            providesTags: ['Tickets'],
        }),
        getTicket: builder.query<
            ApiResponse<TicketCreateResponse & { permission_class: number }>,
            { projectId: string; ticketId: string }
        >({
            query: ({ projectId, ticketId }) => ({
                url: `${API_PATHS.PROJECTS}${projectId}${API_PATHS.TICKETS}${ticketId}/`,
            }),
            providesTags: ['Ticket'],
        }),
        createTicket: builder.mutation<
            ApiResponse<TicketCreateResponse>,
            TicketCreateData
        >({
            query: (data) => ({
                url: `${API_PATHS.PROJECTS}${data.project_id}${API_PATHS.TICKETS}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Tickets'],
        }),
        deleteTicket: builder.mutation<void, TicketDeleteData>({
            query: ({ projectId, ticketId }) => ({
                url: `${API_PATHS.PROJECTS}${projectId}${API_PATHS.TICKETS}${ticketId}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Tickets', 'Ticket'],
        }),
        updateTicket: builder.mutation<
            ApiResponse<TicketCreateResponse>,
            {
                projectId: string;
                ticketId: string;
                updateData: Partial<TicketCreateData>;
            }
        >({
            query: ({ projectId, ticketId, updateData }) => ({
                url: `${API_PATHS.PROJECTS}${projectId}${API_PATHS.TICKETS}${ticketId}/`,
                method: 'PATCH',
                body: updateData,
            }),
            invalidatesTags: ['Ticket', 'Tickets'],
        }),
        subscribeTicket: builder.mutation<
            void,
            { projectId: string; ticketId: string }
        >({
            query: ({ projectId, ticketId }) => ({
                url: `${API_PATHS.PROJECTS}${projectId}${API_PATHS.TICKETS}${ticketId}/subscribe/`,
                method: 'POST',
            }),
            invalidatesTags: ['Ticket'],
        }),
        unsubscribeTicket: builder.mutation<
            void,
            { projectId: string; ticketId: string }
        >({
            query: ({ projectId, ticketId }) => ({
                url: `${API_PATHS.PROJECTS}${projectId}${API_PATHS.TICKETS}${ticketId}/unsubscribe/`,
                method: 'POST',
            }),
            invalidatesTags: ['Ticket'],
        }),
        getMovableProjects: builder.query<
            ApiResponse<ProjectListResponse[]>,
            { projectId: string; ticketId: string }
        >({
            query: ({ projectId, ticketId }) => ({
                url: `${API_PATHS.PROJECTS}${projectId}${API_PATHS.TICKETS}${ticketId}/movable_projects/`,
            }),
        }),
        getJQLTickets: builder.mutation<
            ApiResponse<{ id: string; title: string; jira_key: string }[]>,
            { projectId: string; data: Record<'jql', string> }
        >({
            query: ({ projectId, data }) => ({
                url: `${API_PATHS.PROJECTS}${projectId}${API_PATHS.TICKETS}jira-import-list/`,
                method: 'POST',
                body: data,
            }),
        }),
        importTicket: builder.mutation<
            ApiResponse<TicketCreateResponse>,
            { projectId: string; data: Record<'jira_id', string> }
        >({
            query: ({ projectId, data }) => ({
                url: `${API_PATHS.PROJECTS}${projectId}${API_PATHS.TICKETS}import-ticket/`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Tickets'],
        }),
    }),
});

export const {
    useCreateTicketMutation,
    useDeleteTicketMutation,
    useGetProjectTicketsQuery,
    useGetTicketQuery,
    useGetUserTicketsQuery,
    useSubscribeTicketMutation,
    useUnsubscribeTicketMutation,
    useUpdateTicketMutation,
    useGetMovableProjectsQuery,
    useGetJQLTicketsMutation,
    useImportTicketMutation,
} = ticketApi;
