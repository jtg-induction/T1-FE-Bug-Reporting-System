import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { ProjectListResponse } from 'types/common';
import { handleFilterChange, handleSortChange } from 'utils/utils';

import { Add } from '@mui/icons-material';
import { Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import { GridRowParams } from '@mui/x-data-grid';

import { SectionCard, Table } from '@components';
import { useGetProjectsQuery } from '@service';

import { columns } from './ActiveProjectSection.configs';
import { HeaderStack } from './ActiveProjectSection.styles';
import { ProjectsSectionProps } from './ActiveProjectSection.types';

export const ActiveProjectSection = ({ onAddClick }: ProjectsSectionProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
        filter: filterModel,
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
                    <Typography variant="h2">Active Projects</Typography>
                    <Button
                        variant="contained"
                        startIcon={!isMobile && <Add />}
                        onClick={onAddClick}
                    >
                        {isMobile ? <Add /> : 'Create Project'}
                    </Button>
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
