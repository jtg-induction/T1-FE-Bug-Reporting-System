import { ProjectListResponse } from 'types/common';

import { Add } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

import { SectionCard, Table } from '@components';
import { PROJECT_ROLE_MAP } from '@constant';
import { useGetProjectsQuery } from '@service';

import { HeaderStack } from './ActiveProjectSection.styles';
import { ProjectsSectionProps } from './ActiveProjectSection.types';

export const ActiveProjectSection = ({ onAddClick }: ProjectsSectionProps) => {
    const { data: projects, isLoading } = useGetProjectsQuery();
    const projectsData = projects?.data ?? [];

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

    return (
        <SectionCard
            TitleContent={
                <HeaderStack>
                    <Typography variant="h2">Your Projects</Typography>
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={onAddClick}
                    >
                        Create Project
                    </Button>
                </HeaderStack>
            }
            MainContent={
                <Table
                    loading={isLoading}
                    rows={projectsData}
                    columns={columns}
                    pageSize={5}
                />
            }
        />
    );
};
