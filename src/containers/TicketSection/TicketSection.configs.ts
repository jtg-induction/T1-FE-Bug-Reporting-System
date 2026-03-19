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
            { value: 1, label: 'Low' },
            { value: 2, label: 'Mid' },
            { value: 3, label: 'High' },
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
            { value: 2, label: 'Resolved' },
            { value: 3, label: 'In Progress' },
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
