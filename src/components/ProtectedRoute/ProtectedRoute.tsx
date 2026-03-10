import React from 'react';

import { useAuth } from 'context/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ children }: React.PropsWithChildren) => {
    const { user } = useAuth();
    const { pathname } = useLocation();

    if (!user && pathname) {
        return <Navigate to="/login" />;
    }

    return children;
};
