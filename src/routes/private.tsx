import { privatePaths } from 'constant/paths';

import { Overview } from '@pages';

export const privateRoutes = [
    {
        path: privatePaths.dashboard,
        element: <Overview />,
    },
];
