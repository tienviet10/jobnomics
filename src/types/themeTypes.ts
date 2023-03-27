import { PaletteColorOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteColor {
    darker?: string;
    main: string;
    translucent: string;
    light: string;
    dark: string;
    contrastText: string;
  }

  interface SimplePaletteColorOptions {
    darker?: string;
  }

  interface Theme {
    status: {
      danger: React.CSSProperties["color"];
    };
    overrides: overrides;
  }

  interface Palette {
    primary: PaletteColor;
    secondary: PaletteColor;
    error: PaletteColor;
    warning: PaletteColor;
    info: PaletteColor;
    success: PaletteColor;
    neutral: PaletteColor;
    accent: PaletteColor;
  }

  interface PaletteOptions {
    primary?: PaletteColorOptions;
    secondary?: PaletteColorOptions;
    error?: PaletteColorOptions;
    warning?: PaletteColorOptions;
    info?: PaletteColorOptions;
    success?: PaletteColorOptions;
    neutral?: PaletteColorOptions;
    accent?: CustomPaletteOptions;
    translucent?: CustomPaletteOptions;
  }

  interface CustomPaletteOptions {
    main: string;
    light?: string;
    dark?: string;
    contrastText?: string;
    translucent?: string;
  }

  interface overrides {
    MuiPaper?: {
      root?: {
        bgColor?: string;
      };
    };
    MuiInputLabel?: {
      root?: {
        textTransform?: string;
        fontSize?: string;
      };
    };

    MuiInput?: {
      root?: {
        top?: string;
        border?: string;
        outline?: string;

        padding?: string;

        "&$focused"?: {
          borderColor?: string;

          outlineColor?: string;
        };
      };
    };
  }
}
