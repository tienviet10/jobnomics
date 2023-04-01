import { createTheme } from "@mui/material/styles";
import { teal, grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: { main: "#3A506B", dark: "#1C2541" },
    accent: {
      light: teal[300],
      main: teal[400],
      dark: teal[600],
      contrastText: "rgba(0, 0, 0, 0.87)",
      translucent: "rgba(38, 166, 153, 0.2)",
    },
    neutral: {
      light: grey[100],
      main: grey[200],
      dark: grey[400],
      darker: grey[600],
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    translucent: {
      light: "rgb(255, 255, 255, 0.5)",
      main: "rgb(255, 255, 255, 0.7)",
      dark: "rgb(255, 255, 255, 1)",
    },
    background: {
      default: grey[100],
    },
    action: {
      disabledBackground: grey[400],
      disabled: grey[400],
    },
  },

  typography: {
    fontFamily: [
      "Roboto",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h4: {
      fontSize: "1.6rem",
      "@media (min-width:600px)": {
        fontSize: "1.8rem",
      },
      "@media (min-width:900px)": {
        fontSize: "2rem",
      },
      fontWeight: "bold",
    },
    h5: {
      fontSize: "1.4rem",
      lineHeight: 1.2,
      "@media (min-width:600px)": {
        fontSize: "1.5rem",
        lineHeight: 1.5,
      },
      "@media (min-width:900px)": {
        fontSize: "1.6rem",
        lineHeight: 1.6,
      },
      fontWeight: "bold",
    },

    h6: {
      fontSize: "1.2rem",
      lineHeight: 1.2,
      fontWeight: 700,
      "@media (min-width:600px)": {
        fontSize: "1.2rem",
        lineHeight: 1.4,
      },
      "@media (min-width:900px)": {
        fontSize: "1.4rem",
        lineHeight: 1.6,
      },
    },
    subtitle1: {
      fontFamily: [
        "Dongle",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      fontSize: "1.6rem",
      fontWeight: 700,
    },
    subtitle2: {
      fontSize: "0.8rem",
      fontWeight: 700,
      "@media (min-width:900px)": {
        fontSize: "1rem",
      },
    },
    caption: {
      fontWeight: 400,
      fontSize: "0.7rem",
      "@media (min-width:600px)": {
        fontSize: "0.8rem",
      },
      lineHeight: "1rem",
    },
    body1: {
      fontSize: "0.9rem",
      "@media (min-width:600px)": {
        fontSize: "1rem",
      },
    },
  },
});

// theme.overrides = {
//   /* Button overrides not included to make this easier to read */

//   MuiInputLabel: {
//     root: {
//       textTransform: "uppercase",

//       fontSize: "1.5rem",
//     },
//   },

//   MuiInput: {
//     root: {
//       "&$focused": {
//         borderColor: teal[400],

//         outlineColor: teal[400],
//       },
//     },

//     // we don't need `focused: {}` with overrides
//   },
// };

export { theme };
