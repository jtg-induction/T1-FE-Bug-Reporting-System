import { TicketCreateResponse } from 'types/common';

import { GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef<TicketCreateResponse>[] = [
    {
        field: 'id',
        headerName: 'ID',
        width: 80,
        renderCell: (params) =>
            params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
    },
    { field: 'title', headerName: 'Title', flex: 1.5 },
    { field: 'reporter', headerName: 'Reporter', flex: 1 },
    { field: 'assignee', headerName: 'Assignee', flex: 1 },
    {
        field: 'severity',
        headerName: 'Severity',
        flex: 0.8,
        type: 'singleSelect',
        valueOptions: [
            { value: 1, label: 'Lowest' },
            { value: 2, label: 'Low' },
            { value: 3, label: 'Mid' },
            { value: 4, label: 'High' },
            { value: 5, label: 'Highest' },
        ],
        valueGetter: (value) => value,
    },
    {
        field: 'status',
        headerName: 'Status',
        flex: 1,
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
        flex: 1,
        valueGetter: (value) => {
            if (!value) return 'None';
            return new Date(value).toDateString();
        },
    },
];
