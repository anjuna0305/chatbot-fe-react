import React, { useCallback, useMemo } from "react";
import { LoginRequest, LoginResponse } from "@/types/auth";
import { API_ENDPOINTS } from "@/utils/api";
import axiosInstance from "@/api/axios";
import { AuthContext, AuthState } from "./authContext";

const STORAGE_KEY_TOKEN = "subasa_access_token";
const STORAGE_KEY_ROLE = "subasa_role";
const STORAGE_ORGANIZATION_ID = "subasa_organization";

function getInitialAuthState(): AuthState {
  const token = localStorage.getItem(STORAGE_KEY_TOKEN);
  const role = localStorage.getItem(STORAGE_KEY_ROLE);
  const orgId = localStorage.getItem(STORAGE_ORGANIZATION_ID);
  if (token) {
    return {
      accessToken: token,
      role,
      organization_id: orgId,
      isAuthenticated: true,
    };
  }
  return {
    accessToken: null,
    role: null,
    organization_id: null,
    isAuthenticated: false,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] =
    React.useState<AuthState>(getInitialAuthState);

  const login = useCallback(async (credentials: LoginRequest) => {
    const response = await axiosInstance.post<LoginResponse>(
      API_ENDPOINTS.LOGIN,
      credentials,
    );

    const data = response.data;

    localStorage.setItem(STORAGE_KEY_TOKEN, data.access_token);
    localStorage.setItem(STORAGE_KEY_ROLE, data.role);
    localStorage.setItem(STORAGE_ORGANIZATION_ID, data.role);

    setAuthState({
      accessToken: data.access_token,
      role: data.role,
      organization_id: data.organization_id,
      isAuthenticated: true,
    });
  }, []);

  const logout = useCallback(() => {
    console.log("logout called");
    localStorage.removeItem(STORAGE_KEY_TOKEN);
    localStorage.removeItem(STORAGE_KEY_ROLE);
    setAuthState({
      accessToken: null,
      role: null,
      organization_id: null,
      isAuthenticated: false,
    });
  }, []);

  const value = useMemo(
    () => ({ ...authState, login, logout }),
    [authState, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
