import React, { useState, useEffect, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { pink } from "@mui/material/colors";

const light = {
  palette: {
    mode: "light",
  },
};

const dark = {
  palette: {
    mode: "dark",
  },
};

const Theme = ({ children }) => {
  const [theme, setTheme] = useState(getDefaultTheme());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (!mounted) setMounted(true);
  }, [theme]);

  const themeMode = useMemo(
    () => createTheme(theme === "light" ? light : dark),
    [theme]
  );

  const toggler = () =>
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));

  if (!mounted) return <div style={{ visibility: "hidden" }} />;

  console.log(pink);

  return (
    <ThemeProvider theme={{ ...themeMode, toggler }}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

const isDefaultDark = () =>
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const getDefaultTheme = () => {
  if (typeof window !== "undefined") {
    const localTheme = window.localStorage.getItem("theme");
    const browserTheme = isDefaultDark() ? "dark" : "light";
    return localTheme || browserTheme;
  }
};

export default Theme;
