import { PRIVATE_PATHS } from '@constant';
import { Overview, Profile } from '@pages';

export const privateRoutes = [
    {
        path: PRIVATE_PATHS.DASHBOARD,
        element: <Overview />,
    },

    {
        path: '/profile/:userId',
        element: <Profile />,
    },
];
