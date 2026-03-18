import {
    DashboardHeader,
    TopProjectsList,
    TopTicketsList,
} from '@containers';

import { GridContainer, StyledStack } from './Overview.styles';

export const Overview = () => (
        <StyledStack spacing={4}>
            <DashboardHeader />

            <GridContainer>
                <TopProjectsList />
                <TopTicketsList />
            </GridContainer>
        </StyledStack>
    );