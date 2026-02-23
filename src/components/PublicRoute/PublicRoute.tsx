import { useEffect, useState } from 'react';

import { useAuth } from 'context/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

import { PUBLIC_ROUTE_CONFIG } from './PublicRoute.config';
import { RefreshResponse } from './PublicRoute.types';

export const PublicRoute = () => {
    const { accessToken, setAccessToken } = useAuth();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const verifySession = async () => {
            if (accessToken) {
                setIsChecking(false);
                return;
            }

            try {
                const response = await fetch(
                    PUBLIC_ROUTE_CONFIG.endpoints.refresh,
                    {
                        method: 'POST',
                        credentials: 'include',
                    },
                );

                if (response.ok) {
                    const data = (await response.json()) as RefreshResponse;
                    setAccessToken(data.access);
                }
            } catch {
            } finally {
                setIsChecking(false);
            }
        };

        verifySession();
    }, [accessToken, setAccessToken]);

    if (isChecking) {
        return <div>{PUBLIC_ROUTE_CONFIG.messages.loading}</div>;
    }

    if (accessToken) {
        return <Navigate to={PUBLIC_ROUTE_CONFIG.routes.home} replace />;
    }

    return <Outlet />;
};
