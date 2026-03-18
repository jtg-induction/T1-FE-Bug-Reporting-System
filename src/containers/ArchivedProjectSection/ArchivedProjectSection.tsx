import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { ProjectListResponse } from 'types/common';
import { handleFilterChange, handleSortChange } from 'utils/utils';

import { Typography } from '@mui/material';
import { GridColDef, GridRowParams } from '@mui/x-data-grid';

import { SectionCard, Table } from '@components';
import { PROJECT_ROLE_MAP } from '@constant';
import { useGetProjectsQuery } from '@service';

import { HeaderStack } from './ArchivedProjectSection.styles';

export const ArchivedProjectSection = () => {
    const columns: GridColDef<ProjectListResponse>[] = [
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
    ];

    const navigate = useNavigate();
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });
    const [filterModel, setFilterModel] = useState({});
    const [sortModel, setSortModel] = useState<string>();

    const { data: projects, isLoading } = useGetProjectsQuery({
        limit: paginationModel.pageSize,
        offset: paginationModel.page * paginationModel.pageSize,
        ordering: sortModel,
        filter: {
            status: 'archived',
            ...filterModel,
        },
    });

    const projectsData = projects?.data.results ?? [];
    const projectsCount = projects?.data.count ?? 0;
    const handleRowClick = (params: GridRowParams<ProjectListResponse>) => {
        navigate(`/projects/${params.row.id}`);
    };
    return (
        <SectionCard
            TitleContent={
                <HeaderStack>
                    <Typography variant="h2">Archived Projects</Typography>
                </HeaderStack>
            }
            MainContent={
                <Table
                    loading={isLoading}
                    rows={projectsData}
                    columns={columns}
                    rowCount={projectsCount}
                    paginationModel={paginationModel}
                    onFilterModelChange={(newModel) =>
                        handleFilterChange(newModel, setFilterModel)
                    }
                    onSortModelChange={(newModel) =>
                        handleSortChange(newModel, setSortModel)
                    }
                    onPaginationModelChange={setPaginationModel}
                    onRowClick={handleRowClick}
                    sx={{ cursor: 'pointer' }}
                />
            }
        />
    );
};
