import { ProjectListResponse } from 'types/common';

import { GridColDef } from '@mui/x-data-grid';

import {
    PROJECT_ROLE_MAP,
    PROJECT_ROLE_OPTIONS,
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
        type: 'singleSelect',
        valueOptions: PROJECT_ROLE_OPTIONS.map((item) => ({
            value: item.VALUE,
            label: item.LABEL,
        })),
        valueFormatter: (value) => PROJECT_ROLE_MAP[value],
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 160,
        type: 'singleSelect',
        valueOptions: PROJECT_STATUS_OPTIONS.map((item) => ({
            value: item.VALUE,
            label: item.LABEL,
        })),
        valueFormatter: (params) => PROJECT_STATUS_MAP[params],
    },
];
