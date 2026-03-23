import { Dispatch, SetStateAction } from 'react';

import { GridPaginationModel } from '@mui/x-data-grid';

export interface User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    designation: string;
}

export interface ProjectMember {
    id: string;
    role: number;
    member: User;
}

export interface UserTableProps {
    isAdmin: boolean;
    isActive: boolean;
    ownerId: string;
    isOwner: boolean;
    currentUserId: string;
    paginationModel: GridPaginationModel;
    ordering: string | undefined;
    filter: Record<string, string>;
    setPaginationModel: Dispatch<
        SetStateAction<{ page: number; pageSize: number }>
    >;
    setFilterModel: Dispatch<SetStateAction<object>>;
    setSortModel: Dispatch<SetStateAction<string | undefined>>;
}
