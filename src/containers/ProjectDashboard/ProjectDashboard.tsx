import { useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { Tabs, Typography } from '@mui/material';

import {
    ProjectReportContainer,
    ProjectUsers,
    TicketSection,
} from '@containers';
import { ProjectDetailContainer } from '@containers';
import { NotFoundPage } from '@pages/NotFoundPage';
import { useGetMeQuery, useGetProjectQuery } from '@service';

import { DASHBOARD_TEXT, TAB_MAP } from './ProjectDashboard.config';
import {
    StyledDashboardContainer,
    StyledTab,
    StyledTabPanel,
    StyledTabsContainer,
    StyledTabsWrapper,
} from './ProjectDashboard.styles';

export const ProjectDashboardContainer = () => {
    const { id: projectId, tab } = useParams<{ id: string; tab?: string }>();
    const navigate = useNavigate();
    const tabValue = tab ? TAB_MAP.indexOf(tab) : 0;

    const { data: currentUser } = useGetMeQuery();
    const { data: project, isLoading } = useGetProjectQuery(
        projectId as string,
        { skip: !projectId },
    );

    useEffect(() => {
        if (!tab) {
            navigate(`/projects/${projectId}/tickets`, { replace: true });
        }
    }, [tab, projectId, navigate]);

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
    const isAdmin = projectData?.project_role === 2;
    const isActive = projectData?.status === 2;
    const isOwner = projectData?.owner === currentUserData?.id;

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        const tabName = TAB_MAP[newValue];
        navigate(`/projects/${projectId}/${tabName}`);
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
                        <ProjectReportContainer isAdmin={isAdmin} />
                    </StyledTabPanel>
                )}
            </StyledTabsContainer>
        </StyledDashboardContainer>
    );
};
