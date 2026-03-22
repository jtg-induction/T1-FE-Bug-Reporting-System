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
        renderCell: (params) =>
            params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
    },
    { field: 'key', headerName: 'Project Key', flex: 1 },
    { field: 'title', headerName: 'Project Title', flex: 1.5 },
    {
        field: 'project_role',
        headerName: 'Role',
        flex: 1,
        valueGetter: (value) => PROJECT_ROLE_MAP[value] || 'Unknown',
    },
    {
        field: 'status',
        headerName: 'Status',
        flex: 1,
        type: 'singleSelect',
        valueOptions: PROJECT_STATUS_OPTIONS.map((item) => ({
            value: item.LABEL.toLowerCase(),
            label: item.LABEL,
        })),
        valueFormatter: (params) => PROJECT_STATUS_MAP[params],
    },
];
