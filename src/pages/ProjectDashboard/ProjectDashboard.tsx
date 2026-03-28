import { useState } from 'react';

import { useParams } from 'react-router-dom';

import { Box, Tabs, Typography } from '@mui/material';

import { TicketSection, UserTable } from '@containers';
import { ProjectDetailContainer } from '@containers';
import { NotFoundPage } from '@pages/NotFoundPage';
import { useGetMeQuery, useGetProjectQuery } from '@service';

import {
    DASHBOARD_TEXT,
    PROJECT_TABS,
    TAB_VALUES,
} from './ProjectDashboard.config';
import {
    StyledDashboardContainer,
    StyledTab,
    StyledTabPanel,
    StyledTabsContainer,
    StyledTabsWrapper,
} from './ProjectDashboard.styles';

export const ProjectDashboard = () => {
    const { id: projectId } = useParams<{ id: string }>();
    const [tabValue, setTabValue] = useState<number>(TAB_VALUES.TICKETS);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });
    const [filterModel, setFilterModel] = useState({});
    const [sortModel, setSortModel] = useState<string>();

    const { data: currentUser } = useGetMeQuery();
    const { data: project, isLoading } = useGetProjectQuery(
        projectId as string,
        { skip: !projectId },
    );

    if (isLoading) {
        return (
            <Typography variant="h6" align="center">
                {DASHBOARD_TEXT.loading}
            </Typography>
        );
    }

    if (!project) {
        return <NotFoundPage />;
    }
    const currentUserData = currentUser?.data;
    const projectData = project?.data;
    const isAdmin = projectData?.project_role === 1;
    const isActive = projectData?.status === 1;
    const isOwner = projectData?.owner === currentUserData?.id;

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <StyledDashboardContainer>
            <ProjectDetailContainer
                isActive={isActive}
                isAdmin={isAdmin}
                isOwner={isOwner}
                projectData={projectData}
                currentUserData={currentUserData}
            />

            <StyledTabsContainer>
                <StyledTabsWrapper>
                    <Tabs value={tabValue} onChange={handleTabChange}>
                        {PROJECT_TABS.map((tab) => (
                            <StyledTab
                                key={tab.value}
                                label={tab.label}
                                value={tab.value}
                            />
                        ))}
                    </Tabs>
                </StyledTabsWrapper>

                {tabValue === TAB_VALUES.TICKETS && (
                    <StyledTabPanel>
                        <TicketSection isAdmin={isAdmin} isActive={isActive} />
                    </StyledTabPanel>
                )}
                {tabValue === TAB_VALUES.USERS && (
                    <StyledTabPanel>
                        <UserTable
                            filter={filterModel}
                            ordering={sortModel}
                            paginationModel={paginationModel}
                            setPaginationModel={setPaginationModel}
                            setFilterModel={setFilterModel}
                            setSortModel={setSortModel}
                            isAdmin={isAdmin}
                            isActive={isActive}
                            ownerId={projectData?.owner}
                            isOwner={isOwner}
                            currentUserId={currentUserData?.id}
                        />
                    </StyledTabPanel>
                )}
                {tabValue === TAB_VALUES.SUMMARY && (
                    <StyledTabPanel>
                        <Box>Summary</Box>
                    </StyledTabPanel>
                )}
            </StyledTabsContainer>
        </StyledDashboardContainer>
    );
};
