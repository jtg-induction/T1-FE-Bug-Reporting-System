import { ProjectListResponse } from 'types/common';

import { GridColDef } from '@mui/x-data-grid';

import {
    PROJECT_ROLE_MAP,
    PROJECT_STATUS_MAP,
    PROJECT_STATUS_OPTIONS,
} from '@constant';

export const columns: GridColDef<ProjectListResponse>[] = [
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
        field: 'key',
        headerName: 'Project Key',
        width: 160,
    },
    {
        field: 'title',
        headerName: 'Project Title',
        flex: 1.5,
        minWidth: 200,
    },
    {
        field: 'project_role',
        headerName: 'Role',
        width: 160,
        valueGetter: (value) => PROJECT_ROLE_MAP[value] || 'Unknown',
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 160,
        type: 'singleSelect',
        valueOptions: PROJECT_STATUS_OPTIONS.map((item) => ({
            value: item.LABEL.toLowerCase(),
            label: item.LABEL,
        })),
        valueFormatter: (params) => PROJECT_STATUS_MAP[params],
    },
];
