import { PRIVATE_PATHS } from '@constant';
import {
    AcceptInvitePage,
    Overview,
    ProfilePage,
    ProjectDashboard,
    ProjectsPage,
    RejectInvitePage,
} from '@pages';

export const privateRoutes = [
    {
        path: PRIVATE_PATHS.DASHBOARD,
        element: <Overview />,
    },
    {
        path: `${PRIVATE_PATHS.PROFILE}/:userId`,
        element: <ProfilePage />,
    },
    {
        path: PRIVATE_PATHS.PROJECTS,
        element: <ProjectsPage />,
    },
    {
        path: PRIVATE_PATHS.PROJECT_DASHBOARD,
        element: <ProjectDashboard />,
    },
    {
        path: PRIVATE_PATHS.PROJECT_ACCEPT_INVITE,
        element: <AcceptInvitePage />,
    },
    {
        path: PRIVATE_PATHS.PROJECT_REJECT_INVITE,
        element: <RejectInvitePage />,
    },
];
