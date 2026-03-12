import { Navigate, Outlet } from 'react-router-dom';

import { PUBLIC_PATHS } from '@constant';
import { useGetMeQuery } from '@service';

/**
 * Route guard component that restricts access to authenticated users.
 * Redirects to login if no user data is found or the session is invalid.
 */
export const ProtectedRoute = () => {
    // --- 1. STATE ---

    // --- 2. HOOKS ---
    const { data, isLoading } = useGetMeQuery();

    // --- 3. FUNCTIONS / LOGIC ---
    if (isLoading) return null;

    if (!data) return <Navigate to={PUBLIC_PATHS.LOGIN} replace />;

    return <Outlet />;
};
