import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from 'redux/store';

import { PRIVATE_PATHS, PUBLIC_PATHS } from '@constant';
import { useGetMeQuery } from '@service';

import { ProtectedRouteProps } from './ProtectedRoute.types';

export const ProtectedRoute = ({
    isPublicRoute = false,
}: ProtectedRouteProps) => {
    const { data, isLoading } = useGetMeQuery();
    const access = useAppSelector((state) => state.auth.access);
    const location = useLocation();
    if (isLoading) return null;

    const isAuthenticated = !!(data || access);

    if (isPublicRoute) {
        if (isAuthenticated) {
            const searchParams = new URLSearchParams(location.search);
            const continuePath = searchParams.get('continue');

            return (
                <Navigate
                    to={continuePath || PRIVATE_PATHS.DASHBOARD}
                    replace
                />
            );
        }
        return <Outlet />;
    }
    if (!isAuthenticated) {
        const targetUrl = `${location.pathname}${location.search}`;
        const continueParam = encodeURIComponent(targetUrl);
        return (
            <Navigate
                to={`${PUBLIC_PATHS.LOGIN}?continue=${continueParam}`}
                replace
            />
        );
    }

    return <Outlet />;
};
