import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { DESIGNATION_MAP } from '@constant';
import { UserTableActions } from '@containers';

import { ProjectMember } from './UserTable.types';

export const MEMBER_ROLES = [
    { value: 0, label: 'Developer' },
    { value: 1, label: 'Admin' },
];

export const MEMBER_STATUS: Record<number, string> = {
    0: 'Invited',
    1: 'Active',
};

interface GetColumnsParams {
    ownerId?: string;
    isAdmin: boolean;
    isActive: boolean;
    currentUserId?: string;
    isOwner: boolean;
}

export const getUserTableColumns = ({
    ownerId,
    isAdmin,
    isActive,
    currentUserId,
    isOwner,
}: GetColumnsParams): GridColDef<ProjectMember>[] => [
    {
        field: 'index',
        headerName: 'ID',
        width: 70,
        filterable: false,
        sortable: false,
        renderCell: (params) =>
            params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
    },
    {
        field: 'first_name',
        headerName: 'First Name',
        flex: 1,
        valueGetter: (_, row) => row.member?.first_name,
    },
    {
        field: 'last_name',
        headerName: 'Last Name',
        flex: 1,
        valueGetter: (_, row) => row.member?.last_name,
    },
    {
        field: 'email',
        headerName: 'Email',
        flex: 1.5,
        valueGetter: (_, row) => row.member?.email,
    },
    {
        field: 'designation',
        headerName: 'Designation',
        flex: 1,
        type: 'singleSelect',
        valueOptions: DESIGNATION_MAP,
        valueGetter: (_, row) => row.member?.designation,
    },
    {
        field: 'role',
        headerName: 'Role',
        flex: 1,
        type: 'singleSelect',
        valueOptions: MEMBER_ROLES,
        renderCell: (params) => {
            if (params.row.member?.id === ownerId) {
                return 'Owner';
            }
            return MEMBER_ROLES.find((r) => r.value === params.value)?.label;
        },
    },
    {
        field: 'actions',
        headerName: 'Actions',
        width: 80,
        sortable: false,
        filterable: false,
        align: 'center',
        renderCell: (params: GridRenderCellParams<ProjectMember>) => {
            const userId = params.row.member?.id;
            if (!userId) return null;

            return (
                <UserTableActions
                    userId={userId}
                    isRowAdmin={params.row.role === 1}
                    isAdmin={isAdmin}
                    isActive={isActive}
                    currentUserId={currentUserId}
                    ownerId={ownerId}
                    isOwner={isOwner}
                />
            );
        },
    },
];
