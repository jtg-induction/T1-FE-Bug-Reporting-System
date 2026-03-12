import { PUBLIC_PATHS } from '@constant';
import { LoginPage, SignupCompletePage, SignupRequestPage } from '@pages';

export const publicRoutes = [
    {
        path: PUBLIC_PATHS.LOGIN,
        element: <LoginPage />,
    },
    {
        path: PUBLIC_PATHS.REQUEST_REGISTER,
        element: <SignupRequestPage />,
    },
    {
        path: PUBLIC_PATHS.COMPLETE_REGISTER,
        element: <SignupCompletePage />,
    },
];
