import { Link } from 'react-router-dom';
import { TicketCreateResponse } from 'types/common';

import { Box, Tooltip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

import { PRIVATE_PATHS } from '@constant';
import { formatDateTime } from '@utils';

export const columns: GridColDef<TicketCreateResponse>[] = [
    {
        field: 'id',
        headerName: 'ID',
        width: 80,
        align: 'center',
        headerAlign: 'center',
        sortable: false,
        filterable: false,
        renderCell: (params) => {
            const paginationModel = params.api.state.pagination.paginationModel;
            const page = paginationModel.page;
            const pageSize = paginationModel.pageSize;
            const relativeIndex =
                params.api.getRowIndexRelativeToVisibleRows(params.id) + 1;
            return page * pageSize + relativeIndex;
        },
    },
    {
        field: 'title',
        headerName: 'Title',
        flex: 1.5,
        minWidth: 200,
        renderCell: (params) => (
            <Box
                component={Link}
                to={`${PRIVATE_PATHS.PROJECTS}${params.row.project_id}${PRIVATE_PATHS.TICKETS}${params.id}`}
                sx={{
                    textDecoration: 'none',
                }}
                color="primary.main"
                fontWeight={500}
            >
                {params.value}
            </Box>
        ),
    },
    {
        field: 'reporter_name',
        headerName: 'Reporter',
        width: 280,
        renderCell: (params) => {
            const displayValue = params.row.reporter_name;

            const hoverValue = params.row.reporter_email;

            return (
                <Tooltip title={hoverValue}>
                    <Box component="span">{displayValue}</Box>
                </Tooltip>
            );
        },
    },
    {
        field: 'assignee_name',
        headerName: 'Assignee',
        width: 320,
        renderCell: (params) => {
            const displayValue = params.row.assignee_name || 'Unassigned';

            const hoverValue = params.row.assignee_email;

            return (
                <Tooltip title={hoverValue}>
                    <Box
                        component="span"
                        color={hoverValue ? 'text.primary' : 'text.secondary'}
                    >
                        {displayValue}
                    </Box>
                </Tooltip>
            );
        },
    },
    {
        field: 'severity',
        headerName: 'Severity',
        width: 120,
        type: 'singleSelect',
        valueOptions: [
            { value: 1, label: 'Lowest' },
            { value: 2, label: 'Low' },
            { value: 3, label: 'Mid' },
            { value: 4, label: 'High' },
            { value: 5, label: 'Highest' },
        ],
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 160,
        type: 'singleSelect',
        valueOptions: [
            { value: 1, label: 'Open' },
            { value: 2, label: 'In Progress' },
            { value: 3, label: 'Resolved' },
            { value: 4, label: 'Closed' },
        ],
    },
    {
        field: 'deadline',
        headerName: 'Deadline',
        type: 'date',
        width: 160,
        valueGetter: (value) => {
            if (!value) return null;
            return new Date(value);
        },
        valueFormatter: (value: Date | null) => {
            if (!value) return 'None';
            return formatDateTime(value, false);
        },
    },
];
