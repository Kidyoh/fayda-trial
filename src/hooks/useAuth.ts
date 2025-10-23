"use client";
import { useState, useEffect, useCallback } from "react";

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    accessToken: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Initialize auth state from HttpOnly cookies (server-side)
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // In a real implementation, this would check HttpOnly cookies
        // For now, we'll use a placeholder that checks localStorage as fallback
        const token = localStorage.getItem("accessToken");
        setAuthState({
          accessToken: token,
          isAuthenticated: !!token,
          isLoading: false,
        });
      } catch (error) {
        console.error("Auth initialization failed:", error);
        setAuthState({
          accessToken: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    };

    initializeAuth();
  }, []);

  const setToken = useCallback((token: string | null) => {
    if (token) {
      localStorage.setItem("accessToken", token);
    } else {
      localStorage.removeItem("accessToken");
    }
    setAuthState({
      accessToken: token,
      isAuthenticated: !!token,
      isLoading: false,
    });
  }, []);

  const clearAuth = useCallback(() => {
    localStorage.removeItem("accessToken");
    setAuthState({
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,
    });
  }, []);

  return {
    ...authState,
    setToken,
    clearAuth,
  };
}
