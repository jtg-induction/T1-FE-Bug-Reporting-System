import { useState } from 'react';

import {
    DashboardHeader,
    ProjectFormContainer,
    TopProjectsList,
} from '@containers';

import { GridContainer, StyledStack } from './Overview.styles';

export const Overview = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    
    return (
        <StyledStack spacing={4}>
            <DashboardHeader />

            <GridContainer>
                <TopProjectsList onAddClick={() => setIsModalOpen(true)} />
                <TopProjectsList onAddClick={() => setIsModalOpen(true)} />
            </GridContainer>

            <ProjectFormContainer
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={() => setIsModalOpen(false)}
            />
        </StyledStack>
    );
};
