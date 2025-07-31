"use client";

import { createTheme } from "@mui/material/styles";

// カスタムカラーコードを反映
export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4C662B", // primary
      contrastText: "#FFFFFF", // onPrimary
      light: "#CDEDA3", // primaryContainer
      dark: "#354E16", // onPrimaryContainer
    },
    secondary: {
      main: "#586249", // secondary
      contrastText: "#FFFFFF", // onSecondary
      light: "#DCE7C8", // secondaryContainer
      dark: "#404A33", // onSecondaryContainer
    },
    tertiary: {
      main: "#386663",
      contrastText: "#FFFFFF",
      light: "#BCECE7",
      dark: "#1F4E4B",
    },
    error: {
      main: "#BA1A1A",
      contrastText: "#FFFFFF",
      light: "#FFDAD6",
      dark: "#93000A",
    },
    background: {
      default: "#F9FAEF", // background
      paper: "#F9FAEF", // surface
    },
    text: {
      primary: "#1A1C16", // onBackground, onSurface
      secondary: "#44483D", // onSurfaceVariant
    },
    divider: "#75796C", // outline
  },
  typography: {
    fontFamily:
      '"WDXL Lubrifont TC", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});
