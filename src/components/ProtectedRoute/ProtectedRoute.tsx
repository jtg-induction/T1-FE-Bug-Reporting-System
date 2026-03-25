import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from 'redux/store';

import { PUBLIC_PATHS } from '@constant';
import { useGetMeQuery } from '@service';

export const ProtectedRoute = () => {
    const { data, isLoading } = useGetMeQuery();
    const access = useAppSelector((state) => state.auth.access);
    const location = useLocation();

    if (isLoading) return null;

    if (!data && !access) {
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
