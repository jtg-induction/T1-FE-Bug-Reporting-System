import { useState } from "react";

import { useAuth } from "../context/useAuth";

type UseFetchProps = {
  baseUrl: string;
  endPoint: string;
};

type CommonFetch = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  input?: { [index: string]: string | number | boolean | null };
  routeParams?: { [index: string]: string | number };
  searchParams?: Record<string, string>;
};

interface RefreshResponse {
  access: string;
}

export function useFetch<T>({ baseUrl, endPoint }: UseFetchProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<unknown>();
  const { accessToken, setAccessToken, logout } = useAuth();

  const commonFetch = async ({
    input,
    method,
    routeParams,
    searchParams,
  }: CommonFetch) => {
    setIsLoading(true);
    setError(undefined);

    try {
      const url = new URL(baseUrl);
      if (routeParams) {
        let endpointWithValues = "";
        const endPointArray = endPoint.split("/");
        endPointArray.forEach((part) => {
          endpointWithValues += "/";
          if (part.charAt(0) === ":") {
            endpointWithValues += routeParams[part.slice(1)];
          } else {
            endpointWithValues += part;
          }
        });
        url.pathname = endpointWithValues.slice(1);
      } else {
        url.pathname = endPoint;
      }

      if (searchParams) {
        url.search = new URLSearchParams(searchParams).toString();
      }

      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
      }

      const fetchOptions: RequestInit = {
        method,
        headers,
        credentials: "include",
        body: input ? JSON.stringify(input) : undefined,
      };

      let response = await fetch(url, fetchOptions);

      if (response.status === 401) {
        try {
          const refreshUrl = new URL("api/refresh/", baseUrl);

          const refreshRes = await fetch(refreshUrl, {
            method: "POST",
            credentials: "include",
          });

          if (!refreshRes.ok) {
            logout();
            throw new Error("Session expired. Please log in again.");
          }

          const refreshData = (await refreshRes.json()) as RefreshResponse;
          const newToken = refreshData.access;

          setAccessToken(newToken);

          headers["Authorization"] = `Bearer ${newToken}`;
          fetchOptions.headers = headers;

          response = await fetch(url, fetchOptions);
        } catch (refreshError) {
          throw refreshError;
        }
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const textData = await response.text();
      const resData = textData
        ? (JSON.parse(textData) as Record<string, unknown>)
        : {};
      setData(resData as T);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, commonFetch, data, error };
}
