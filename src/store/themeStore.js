import { create } from "zustand";
import { persist } from "zustand/middleware";

// Function to get initial theme based on system preference
const getInitialTheme = () => {
  // Check if window is defined (for SSR)
  if (typeof window !== "undefined") {
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem("theme-storage");
    if (savedTheme) {
      try {
        return JSON.parse(savedTheme).state.theme;
      } catch (e) {
        // If parsing fails, fall back to system preference
      }
    }

    // Check system preference
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
  }

  // Default to light theme
  return "light";
};

export const useThemeStore = create(
  persist(
    (set) => ({
      theme: getInitialTheme(),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
    }),
    {
      name: "theme-storage", // Name of the storage key
    }
  )
);
