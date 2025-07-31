// src/types/mui.d.ts
import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    tertiary: Palette["primary"]; // Or define specific color properties
  }

  interface PaletteOptions {
    tertiary?: PaletteOptions["primary"]; // Or define specific color properties
  }
}
