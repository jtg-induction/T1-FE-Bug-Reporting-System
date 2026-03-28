import {
    DashboardHeader,
    TopProjectsList,
    TopTicketsList,
    WeeklyStats,
} from '@containers';

import { GridContainer, StyledStack } from './Overview.styles';

export const Overview = () => (
    <StyledStack spacing={4}>
        <DashboardHeader />
        <WeeklyStats />
        <GridContainer>
            <TopProjectsList />
            <TopTicketsList />
        </GridContainer>
    </StyledStack>
);
