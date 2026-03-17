import { PRIVATE_PATHS } from '@constant';
import { Overview } from '@pages';

export const privateRoutes = [
    {
        path: PRIVATE_PATHS.DASHBOARD,
        element: <Overview />,
    },
];
