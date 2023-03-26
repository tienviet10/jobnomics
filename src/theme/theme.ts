import { createTheme } from "@mui/material/styles";

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
    primary: { main: "#46494C" },
    secondary: { main: "#4c5c68", light: "rgba(75, 91, 104, 0.5)" },
    error: { main: "#ffffff", light: "rgb(255, 255, 255, 0.7)" },
    warning: { main: "#1985a1" },
    info: { main: "#DCDCDD", light: "#ebeaeb" },
    success: { main: "#c5c3c6" },
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

    h5: {
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

    h6: {
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
      fontSize: "1.4rem",
      "@media (min-width:600px)": {
        fontSize: "2.0rem",
      },
      "@media (min-width:900px)": {
        fontSize: "2.4rem",
      },
      lineHeight: 1,
    },
    subtitle1: {
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
      fontSize: "1.1rem",
      fontWeight: 400,
    },
    body1: {
      fontWeight: 500,
    },
    caption: {
      fontWeight: 500,
    },
    button: {
      fontSize: 12,
    },
  },
});
