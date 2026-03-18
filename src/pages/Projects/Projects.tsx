import { useState } from 'react';

import {
    ActiveProjectSection,
    ArchivedProjectSection,
    ProjectFormContainer,
    ProjectHeader,
} from '@containers';

import { StyledStack } from './Projects.styles';

export const ProjectsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <StyledStack>
            <ProjectHeader />
            <ActiveProjectSection onAddClick={() => setIsModalOpen(true)} />
            <ArchivedProjectSection />
            <ProjectFormContainer
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={() => setIsModalOpen(false)}
            />
        </StyledStack>
    );
};
