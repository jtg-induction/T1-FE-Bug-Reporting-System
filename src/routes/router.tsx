import { Layout } from 'layouts';
import { createBrowserRouter } from 'react-router-dom';

import { ProtectedRoute } from '@components/ProtectedRoute';
import { ErrorPage } from '@pages/ErrorPage';
import { NotFoundPage } from '@pages/NotFoundPage';

import { privateRoutes } from './private';
import { publicRoutes } from './public';
export const router = createBrowserRouter([
    {
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            ...publicRoutes,
            {
                element: <ProtectedRoute />,
                children: [...privateRoutes],
            },
            {
                path: '*',
                element: <NotFoundPage />,
            },
        ],
    },
]);
