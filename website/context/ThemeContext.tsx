"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useCookies } from "next-client-cookies";

export enum Theme {
  Light = "light",
  Dark = "dark",
}

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: Theme.Light,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: ThemeProviderProps) {
  const cookies = useCookies();
  const [theme, setTheme] = useState(
    (cookies.get("theme") as Theme) ?? Theme.Light
  );

  function toggleTheme() {
    setTheme((prevTheme) =>
      prevTheme === Theme.Light ? Theme.Dark : Theme.Light
    );

    cookies.set("theme", theme === Theme.Light ? Theme.Dark : Theme.Light);

    document.styleSheets
      .item(0)!
      .insertRule(
        "* { transition: background-color 200ms ease, color 200ms ease, border-color 200ms ease;}"
      );

    document.documentElement.classList.toggle(Theme.Dark);

    setTimeout(() => {
      document.styleSheets.item(0)!.deleteRule(0);
    }, 200);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
