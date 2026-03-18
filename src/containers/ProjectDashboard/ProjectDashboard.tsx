import { useState } from 'react';

import { useParams } from 'react-router-dom';

import { Tabs, Typography } from '@mui/material';

import {
    ProjectReportContainer,
    ProjectUsers,
    TicketSection,
} from '@containers';
import { ProjectDetailContainer } from '@containers';
import { NotFoundPage } from '@pages/NotFoundPage';
import { useGetMeQuery, useGetProjectQuery } from '@service';

import { DASHBOARD_TEXT } from './ProjectDashboard.config';
import {
    StyledDashboardContainer,
    StyledTab,
    StyledTabPanel,
    StyledTabsContainer,
    StyledTabsWrapper,
} from './ProjectDashboard.styles';

export const ProjectDashboardContainer = () => {
    const { id: projectId } = useParams<{ id: string }>();
    const [tabValue, setTabValue] = useState(0);
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
                        <StyledTab label="Tickets" />
                        <StyledTab label="Users" />
                        <StyledTab label="Summary" />
                    </Tabs>
                </StyledTabsWrapper>

                {tabValue === 0 && (
                    <StyledTabPanel>
                        <TicketSection isAdmin={isAdmin} isActive={isActive} />
                    </StyledTabPanel>
                )}
                {tabValue === 1 && (
                    <StyledTabPanel>
                        <ProjectUsers
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
                {tabValue === 2 && (
                    <StyledTabPanel>
                        <ProjectReportContainer />
                    </StyledTabPanel>
                )}
            </StyledTabsContainer>
        </StyledDashboardContainer>
    );
};
