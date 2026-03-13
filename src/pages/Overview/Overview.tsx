import { useState } from 'react';

import { ProjectFormValues } from 'schemas';

import { Stack } from '@mui/material';

import {
    ActiveProjectSection,
    DashboardHeader,
    ProjectFormContainer,
} from '@containers';
import { useCreateProjectMutation } from '@service';

export const Overview = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [createProject, { isLoading: isCreating }] =
        useCreateProjectMutation();

    const handleCreateProject = async (formData: ProjectFormValues) => {
        try {
            await createProject(formData).unwrap();
            setIsModalOpen(false);
        } catch {}
    };

    return (
        <Stack padding={4} gap={4}>
            <DashboardHeader />

            <ActiveProjectSection onAddClick={() => setIsModalOpen(true)} />

            <ProjectFormContainer
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreateProject}
                isLoading={isCreating}
            />
        </Stack>
    );
};
