import { TicketCreateResponse } from 'types/common';

import { GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef<TicketCreateResponse>[] = [
    {
        field: 'id',
        headerName: 'ID',
        width: 80,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) =>
            params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
    },
    {
        field: 'title',
        headerName: 'Title',
        flex: 1.5,
        minWidth: 200,
    },
    {
        field: 'reporter',
        headerName: 'Reporter',
        width: 280,
    },
    {
        field: 'assignee',
        headerName: 'Assignee',
        width: 320,
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
        width: 160,
        valueGetter: (value) => {
            if (!value) return 'None';
            return new Date(value).toDateString();
        },
    },
];
