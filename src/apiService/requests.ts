import { useCallback, useEffect } from "react";

import { useAuth } from "context/useAuth";
import { useFetch } from "hooks/useFetch";

import { API_ENDPOINTS } from "@constant";

import {
  LoginResponse,
  RegistrationFormData,
  RegsiterResponse,
  SendInviteResponse,
  UserProfileProps,
  UserProps,
  UserUpdateProps,
} from "./request.types";

const BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string) || "http://localhost:8000";

export const useLogin = () => {
  const { login } = useAuth();

  const { commonFetch, isLoading, data, error } = useFetch<LoginResponse>({
    baseUrl: BASE_URL,
    endPoint: API_ENDPOINTS.login,
  });

  useEffect(() => {
    if (data && data.access) {
      login(data.access);
    }
  }, [data, login]);

  const loginUser = useCallback(
    (email: string, password: string) => {
      commonFetch({
        method: "POST",
        input: { email, password },
      });
    },
    [commonFetch],
  );

  return { loginUser, isLoading, data, error };
};

export const useSignupInvite = () => {
  const { commonFetch, isLoading, data, error } = useFetch<SendInviteResponse>({
    baseUrl: BASE_URL,
    endPoint: API_ENDPOINTS.sendInvite,
  });

  const sendInvite = useCallback(
    (email: string) => {
      commonFetch({
        method: "POST",
        input: { email },
      });
    },
    [commonFetch],
  );

  return { sendInvite, isLoading, data, error };
};

export const useVerifyInvite = () => {
  const { commonFetch, isLoading, data, error } = useFetch({
    baseUrl: BASE_URL,
    endPoint: API_ENDPOINTS.verifyInvite,
  });

  const verifyToken = useCallback(
    (token: string, email: string) => {
      commonFetch({
        method: "POST",
        searchParams: { token, email },
      });
    },
    [commonFetch],
  );
  return { verifyToken, isLoading, data, error };
};

export const useCompleteRegistration = () => {
  const { register } = useAuth();
  const { commonFetch, isLoading, data, error } = useFetch<RegsiterResponse>({
    baseUrl: BASE_URL,
    endPoint: API_ENDPOINTS.register,
  });

  useEffect(() => {
    if (data && data.access) {
      register(data.access);
    }
  }, [data, register]);

  const registerUser = useCallback(
    (token: string, formData: RegistrationFormData) => {
      commonFetch({
        method: "POST",
        input: { ...formData, token },
      });
    },
    [commonFetch],
  );

  return { registerUser, isLoading, data, error };
};

export const useGetUserProfile = () => {
  const { commonFetch, isLoading, data, error } = useFetch<UserProfileProps>({
    baseUrl: BASE_URL,
    endPoint: API_ENDPOINTS.profile,
  });

  const getUserProfile = () =>
    commonFetch({
      method: "GET",
    });

  return { getUserProfile, isLoading, data, error };
};

export const useGetUser = () => {
  const { commonFetch, isLoading, data, error } = useFetch<UserProps>({
    baseUrl: BASE_URL,
    endPoint: API_ENDPOINTS.user,
  });

  const getUser = (user_id: string) =>
    commonFetch({
      method: "GET",
      routeParams: { user_id: user_id },
    });

  return { getUser, isLoading, data, error };
};

export const useUpdateUser = () => {
  const { commonFetch, isLoading, data, error } = useFetch<UserUpdateProps>({
    baseUrl: BASE_URL,
    endPoint: API_ENDPOINTS.user,
  });

  const updateUser = (formData: UserUpdateProps, user_id: string) =>
    commonFetch({
      method: "PUT",
      routeParams: { user_id: user_id },
      input: { ...formData },
    });

  return { updateUser, isLoading, data, error };
};
