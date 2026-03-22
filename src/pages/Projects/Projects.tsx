import { useState } from 'react';

import {
    ActiveProjectSection,
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
            <ProjectFormContainer
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={() => setIsModalOpen(false)}
            />
        </StyledStack>
    );
};
