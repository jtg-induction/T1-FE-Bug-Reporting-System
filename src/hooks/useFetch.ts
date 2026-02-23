import { useState } from "react";

type UseFetchProps = {
  baseUrl: string;
  endPoint: string;
};

type CommonFetch = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  input?: { [index: string]: string | number };
  routeParams?: { [index: string]: number };
  searchParams?: Record<string, string>;
};

export function useFetch<T>({ baseUrl, endPoint }: UseFetchProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<unknown>();

  const commonFetch = async ({
    input,
    method,
    routeParams,
    searchParams,
  }: CommonFetch) => {
    try {
      setIsLoading(true);
      const url = new URL(baseUrl);

      if (routeParams) {
        let endpointWithValues = "";
        const endPointArray = endPoint.split("/");

        endPointArray.map((part) => {
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

      const response = await fetch(url, {
        method,
        body: JSON.stringify(input),
      });

      const resData = (await response.json()) as T;
      setData(resData);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, commonFetch, data, error };
}
