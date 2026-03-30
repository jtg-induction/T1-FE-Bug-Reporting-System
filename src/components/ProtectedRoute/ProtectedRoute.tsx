import { useEffect } from 'react';

import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { showSnackbar } from 'redux/features/profileSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';

import { PRIVATE_PATHS, PUBLIC_PATHS } from '@constant';
import { useGetMeQuery } from '@service';

import { ProtectedRouteProps } from './ProtectedRoute.types';

export const ProtectedRoute = ({
    isPublicRoute = false,
}: ProtectedRouteProps) => {
    const { data, isLoading } = useGetMeQuery();
    const access = useAppSelector((state) => state.auth.access);
    const location = useLocation();
    const dispatch = useAppDispatch();

    const isAuthenticated = !!(data || access);

    useEffect(() => {
        if (
            isPublicRoute &&
            isAuthenticated &&
            location.pathname === PUBLIC_PATHS.COMPLETE_REGISTER
        ) {
            dispatch(
                showSnackbar({
                    message: 'Please logout before registering a new account.',
                    severity: 'warning',
                }),
            );
        }
    }, [isPublicRoute, isAuthenticated, location.pathname, dispatch]);

    if (isLoading) return null;

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
