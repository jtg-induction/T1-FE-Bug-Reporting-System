import { Add } from '@mui/icons-material';
import { Button, Typography, useMediaQuery, useTheme } from '@mui/material';

import { SectionCard, Table } from '@components';
import { useGetProjectsQuery } from '@service';

import { columns } from './ActiveProjectSection.configs';
import { HeaderStack } from './ActiveProjectSection.styles';
import { ProjectsSectionProps } from './ActiveProjectSection.types';

export const ActiveProjectSection = ({ onAddClick }: ProjectsSectionProps) => {
    const { data: projects, isLoading } = useGetProjectsQuery();
    const projectsData = projects?.data ?? [];
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
                    pageSize={5}
                />
            }
        />
    );
};
