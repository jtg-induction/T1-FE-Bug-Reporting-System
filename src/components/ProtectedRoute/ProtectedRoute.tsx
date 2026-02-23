import { useEffect, useState } from "react";

import { useAuth } from "context/useAuth";
import { Navigate, Outlet } from "react-router-dom";

import { PROTECTED_ROUTE_CONFIG } from "./ProtectedRoute.config";
import { RefreshResponse } from "./ProtectedRoute.types";

export const ProtectedRoute = () => {
  const { accessToken, setAccessToken } = useAuth();

  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      if (accessToken) {
        setIsChecking(false);
        return;
      }
      const response = await fetch(PROTECTED_ROUTE_CONFIG.endpoints.refresh, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        const data = (await response.json()) as RefreshResponse;

        setAccessToken(data.access);
      }
      setIsChecking(false);
    };

    verifySession();
  }, [accessToken, setAccessToken]);

  if (isChecking) {
    return <div>{PROTECTED_ROUTE_CONFIG.messages.loading}</div>;
  }

  if (!accessToken) {
    return <Navigate to={PROTECTED_ROUTE_CONFIG.routes.login} replace />;
  }

  return <Outlet />;
};
