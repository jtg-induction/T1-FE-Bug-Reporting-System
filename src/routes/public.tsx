import { LoginPage, SignupCompletePage, SignupRequestPage } from '@pages';

export const publicRoutes = [
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/signup/request',
        element: <SignupRequestPage />,
    },
    {
        path: '/signup/complete',
        element: <SignupCompletePage />,
    },
];
