import { useState, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";
import { progressService } from "../services/progressService";

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    // Save to API if user is logged in
    const token = localStorage.getItem("auth_token");
    if (token) {
      progressService.updatePreferences(isDark ? "dark" : "light").catch((err) => {
        console.error("Error saving theme preference:", err);
      });
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((s) => !s);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
