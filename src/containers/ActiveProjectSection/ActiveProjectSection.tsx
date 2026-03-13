import { Add } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';

import { SectionCard } from '@components/SectionCard';
import { ProjectTableContainer } from '@containers';
import { useGetProjectsQuery } from '@service';

import { HeaderStack } from './ActiveProjectSection.styles';
import { ProjectsSectionProps } from './ActiveProjectSection.types';

export const ActiveProjectSection = ({ onAddClick }: ProjectsSectionProps) => {
    const { data: projects, isLoading } = useGetProjectsQuery();
    const projectsData = projects?.data ?? [];

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
                <ProjectTableContainer
                    data={projectsData}
                    isLoading={isLoading}
                />
            }
        />
    );
};
