import { Navigate, Outlet } from 'react-router-dom';
import { useGetMeQuery } from 'redux/apiSlice';

import { PUBLIC_PATHS } from '@constant';

export const ProtectedRoute = () => {
    const { data, isLoading } = useGetMeQuery();

    if (isLoading) return null;

    if (!data) return <Navigate to={PUBLIC_PATHS.LOGIN} replace />;

    return <Outlet />;
};
