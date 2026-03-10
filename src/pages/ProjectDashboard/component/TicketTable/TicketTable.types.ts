import { Dispatch, SetStateAction } from 'react';

import { GridPaginationModel } from '@mui/x-data-grid';

export interface User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    designation: string;
}

export interface TicketData {
    id: string;
    title: string;
    description: string;
    assignee: string;
    reporter: string;
    project: string;
    status: number;
    severity: number;
    deadline: string | undefined;
}

export interface ApiError {
    data?: {
        detail?: string;
    };
}

export interface TicketTableProps {
    isAdmin: boolean;
    paginationModel: GridPaginationModel;
    ordering: string | undefined;
    filter: Record<string, string>;
    setPaginationModel: Dispatch<
        SetStateAction<{ page: number; pageSize: number }>
    >;
    setFilterModel: Dispatch<SetStateAction<object>>;
    setSortModel: Dispatch<SetStateAction<string | undefined>>;
}
