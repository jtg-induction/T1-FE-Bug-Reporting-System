import { privatePaths } from 'constant/paths';

import { Overview } from '@pages/Overview';

export const privateRoutes = [
    {
        path: privatePaths.dashboard,
        element: <Overview />,
    },
];
