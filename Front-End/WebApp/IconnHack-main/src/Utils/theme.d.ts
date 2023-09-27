import React from "react";
import { ThemeOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  //  interface ThemeOptions {
  //    status: {
  //      danger: React.CSSProperties["color"];
  //    };
  //  }
  interface Palette {
    white: Palette["primary"];
    black: Palette["primary"];
  }
  interface PaletteOptions {
    white: PaletteOptions["primary"];
    black: PaletteOptions["primary"];
  }
}
