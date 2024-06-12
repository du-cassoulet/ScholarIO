"use client";

import React from "react";
import { Theme, useTheme } from "@/context/ThemeContext";

export default function ThemeButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      Activer le {theme === Theme.Light ? "thème sombre" : "thème clair"}
    </button>
  );
}
