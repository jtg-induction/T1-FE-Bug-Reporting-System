import { useState } from 'react';

import {
    ActiveProjectSection,
    ProjectFormContainer,
    ProjectHeader,
} from '@containers';
import { ProjectFormValues } from '@schemas';
import { useCreateProjectMutation } from '@service';

import { StyledStack } from './Projects.styles';

export const ProjectsPage = () => {
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
        <StyledStack>
            <ProjectHeader />
            <ActiveProjectSection onAddClick={() => setIsModalOpen(true)} />
            <ProjectFormContainer
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreateProject}
                isLoading={isCreating}
            />
        </StyledStack>
    );
};
