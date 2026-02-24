import { RouterProvider as ReactRouterProvider } from 'react-router-dom';

import { router } from './router';

export const RouterProvider = () => <ReactRouterProvider router={router} />;
