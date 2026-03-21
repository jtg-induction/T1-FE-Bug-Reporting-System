import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from 'redux/store';

import { PUBLIC_PATHS } from '@constant';

/**
 * Route guard component that restricts access to authenticated users.
 * Redirects to login if no user data is found or the session is invalid.
 */
export const ProtectedRoute = () => {
    const access = useAppSelector((state) => state.auth.access);

    if (!access) return <Navigate to={PUBLIC_PATHS.LOGIN} replace />;

    return <Outlet />;
};
