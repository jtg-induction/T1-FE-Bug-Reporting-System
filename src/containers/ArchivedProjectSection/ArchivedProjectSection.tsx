import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { ProjectListResponse } from 'types/common';
import { handleFilterChange, handleSortChange } from 'utils/utils';

import { Typography } from '@mui/material';
import { GridRowParams } from '@mui/x-data-grid';

import { SectionCard, Table } from '@components';
import { PRIVATE_PATHS } from '@constant';
import { useGetProjectsQuery } from '@service';

import { columns } from './ArchivedProjectSection.config';
import { HeaderStack } from './ArchivedProjectSection.styles';

export const ArchivedProjectSection = () => {
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });
    const [filterModel, setFilterModel] = useState({});
    const [sortModel, setSortModel] = useState<string>();

    const navigate = useNavigate();

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
        navigate(`${PRIVATE_PATHS.PROJECTS}${params.row.id}`);
    };
    return (
        <SectionCard
            titleContent={
                <HeaderStack>
                    <Typography variant="h2">Archived Projects</Typography>
                </HeaderStack>
            }
            mainContent={
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
