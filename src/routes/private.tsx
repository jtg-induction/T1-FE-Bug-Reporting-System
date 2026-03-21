import { PRIVATE_PATHS } from '@constant';
import { Overview, ProfilePage, ProjectsPage } from '@pages';

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
];
