'use client';
// src/lib/tokenManager.js

let accessToken = null;

// Initialize in useEffect to avoid SSR issues
const initializeToken = () => {
  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("accessToken");
  }
};

export const setAccessToken = (token) => {
  accessToken = token;
  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", token);
  }
};

export const getAccessToken = () => {
  // Only try to get from localStorage on client side
  if (typeof window !== "undefined" && !accessToken) {
    return localStorage.getItem("accessToken");
  }
  return accessToken;
};

export const clearAccessToken = () => {
  accessToken = null;
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
  }
};

// Run initialization if in browser
if (typeof window !== "undefined") {
  initializeToken();
}
