import { createTheme } from "@mui/material/styles";
import { teal, grey, blueGrey, cyan } from "@mui/material/colors";

export const theme = createTheme({
  // components: {
  //   MuiPaper: {
  //     styleOverrides: {
  //       root: {
  //         backgroundColor: "#284B63", // your desired color
  //       },
  //     },
  //   },
  // },
  palette: {
    primary: { main: "#3A506B", dark: "#1C2541" },
    accent: {
      light: cyan[300],
      main: "#007A74",
      dark: cyan[500],
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    neutral: {
      light: grey[100],
      main: grey[200],
      dark: grey[300],
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
      fontFamily: [
        "Dongle",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      fontSize: "1.8rem",
      "@media (min-width:600px)": {
        fontSize: "2.0rem",
      },
      "@media (min-width:900px)": {
        fontSize: "3rem",
      },
      // "@media (min-width:1200px)": {
      //   fontSize: "3rem",
      // },
      fontWeight: "bold",
    },
    h5: {
      fontFamily: [
        "Roboto",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
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
      // "@media (min-width:1200px)": {
      //   fontSize: "3rem",
      // },
      fontWeight: "bold",
    },

    h6: {
      fontFamily: [
        "Roboto",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      fontSize: "1rem",
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
      fontWeight: 400,
    },
    subtitle2: {
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
      fontSize: "0.9rem",
      fontWeight: 700,
      "@media (min-width:900px)": {
        fontSize: "1.1rem",
      },
    },
    body1: {
      // fontWeight: 500,
    },
    caption: {
      fontWeight: 500,
      fontSize: "0.8rem",
      "@media (min-width:600px)": {
        fontSize: "0.9rem",
      },
      "@media (min-width:900px)": {
        fontSize: "1rem",
      },
    },
    button: {
      // fontSize: 15,
    },
  },
});
