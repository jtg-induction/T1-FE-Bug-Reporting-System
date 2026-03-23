import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from 'redux/store';

import { PUBLIC_PATHS } from '@constant';
import { useGetMeQuery } from '@service';

/**
 * Route guard component that restricts access to authenticated users.
 * Redirects to login if no user data is found or the session is invalid.
 */
export const ProtectedRoute = () => {
    const { data, isLoading } = useGetMeQuery();
    const access = useAppSelector((state) => state.auth.access);

    if (isLoading) return null;
    if (!data && !access) return <Navigate to={PUBLIC_PATHS.LOGIN} replace />;

    return <Outlet />;
};
