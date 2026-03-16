import { useState } from 'react';

import {
    DashboardHeader,
    ProjectFormContainer,
    TicketFormContainer,
    TopProjectsList,
    TopTicketsList,
} from '@containers';

import { GridContainer, StyledStack } from './Overview.styles';

export const Overview = () => {
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
    const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

    return (
        <StyledStack spacing={4}>
            <DashboardHeader />

            <GridContainer>
                <TopProjectsList />
                <TopTicketsList />
            </GridContainer>

            <ProjectFormContainer
                open={isProjectModalOpen}
                onClose={() => setIsProjectModalOpen(false)}
                onSubmit={() => setIsProjectModalOpen(false)}
            />
            <TicketFormContainer
                open={isTicketModalOpen}
                onClose={() => setIsTicketModalOpen(false)}
            />
        </StyledStack>
    );
};