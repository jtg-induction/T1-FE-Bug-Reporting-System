import { NotFoundPage } from '@pages';

export const fallbackRoute = [
    {
        path: '*',
        element: <NotFoundPage />,
    },
];
