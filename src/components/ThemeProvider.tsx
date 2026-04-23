"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextValue {
  theme: Theme;
  actualTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "system";
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    return savedTheme ?? "system";
  });

  const systemPrefersDark = useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") return () => {};
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      media.addEventListener("change", callback);
      return () => media.removeEventListener("change", callback);
    },
    () => {
      if (typeof window === "undefined") return false;
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    },
    () => false,
  );

  const actualTheme: "light" | "dark" =
    theme === "dark" || (theme === "system" && systemPrefersDark) ? "dark" : "light";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", actualTheme === "dark");
  }, [actualTheme]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const handleSetTheme = (nextTheme: Theme) => {
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  const toggleTheme = () => {
    handleSetTheme(actualTheme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        actualTheme,
        setTheme: handleSetTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
