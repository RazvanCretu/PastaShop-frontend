import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// export const ThemeContext = createContext();

// export const useThemeCtx = () => useContext(ThemeContext);

const Theme = ({ children }) => {
  let defaultTheme;

  if (typeof window !== "undefined") {
    defaultTheme = getDefaultTheme();
  }

  const [theme, setTheme] = useState(defaultTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    setMounted(true);
  }, [theme]);

  const themeMode = useMemo(
    () =>
      createTheme({
        palette: {
          mode: theme,
        },
        toggler: () => setTheme(theme === "light" ? "dark" : "light"),
      }),
    [theme]
  );

  // const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  if (!mounted) return <div style={{ visibility: "hidden" }} />;

  return (
    // <ThemeContext.Provider value={toggleTheme}>
    <ThemeProvider theme={themeMode}>{children}</ThemeProvider>
    // </ThemeContext.Provider>
  );
};

const isDefaultDark = () =>
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const getDefaultTheme = () => {
  const localTheme = window.localStorage.getItem("theme");
  const browserTheme = isDefaultDark() ? "dark" : "light";
  return localTheme || browserTheme;
};

export default Theme;
