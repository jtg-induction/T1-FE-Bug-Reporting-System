import { publicPaths } from 'constant/paths';
import { Navigate, Outlet } from 'react-router-dom';
import { useGetMeQuery } from 'redux/apiSlice';

export const ProtectedRoute = () => {
    const { data, isLoading } = useGetMeQuery();

    if (isLoading) return null;

    if (!data) return <Navigate to={publicPaths.login} replace />;

    return <Outlet />;
};
