import { create } from "zustand";

interface UIState {
  // Navigation
  isNavbarOpen: boolean;
  setNavbarOpen: (open: boolean) => void;

  // Language
  currentLanguage: string;
  setLanguage: (lang: string) => void;

  // Loading states
  isLoading: boolean;
  setLoading: (loading: boolean) => void;

  // Notifications
  notifications: Array<{
    id: string;
    type: "success" | "error" | "warning" | "info";
    message: string;
    timestamp: number;
  }>;
  addNotification: (
    notification: Omit<UIState["notifications"][0], "id" | "timestamp">,
  ) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;

  // Theme
  theme: "light" | "dark" | "system";
  setTheme: (theme: "light" | "dark" | "system") => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  // Navigation
  isNavbarOpen: false,
  setNavbarOpen: (open) => set({ isNavbarOpen: open }),

  // Language
  currentLanguage: "en",
  setLanguage: (lang) => set({ currentLanguage: lang }),

  // Loading
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),

  // Notifications
  notifications: [],
  addNotification: (notification) => {
    const id = Math.random().toString(36).substr(2, 9);
    const timestamp = Date.now();
    set((state) => ({
      notifications: [
        ...state.notifications,
        { ...notification, id, timestamp },
      ],
    }));
  },
  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },
  clearNotifications: () => set({ notifications: [] }),

  // Theme
  theme: "system",
  setTheme: (theme) => set({ theme }),
}));
