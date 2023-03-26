import React from "react";

import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import { security } from "./components/auth/GlobalAuth";
import NavBar from "./components/NavBar";
import Router from "./Router";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import { theme } from "./theme/theme";

function App() {
  const { getAccessTokenSilently } = useAuth0();
  security.setAccessTokenSilently(getAccessTokenSilently);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <CssBaseline />
        <Router />
        <NavBar />
      </div>
    </ThemeProvider>
  );
}

export default App;
