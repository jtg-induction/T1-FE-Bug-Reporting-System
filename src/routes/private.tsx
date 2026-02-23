import { Overview } from '@pages';

export const privateRoutes = [
    {
        path: '/',
        element: <Overview />,
    },
    {
        path: '/dashboard',
        element: <div>PRIVATE</div>,
    },
];
