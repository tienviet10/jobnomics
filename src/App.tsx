import React from "react";

import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import { security } from "./components/auth/GlobalAuth";
import NavBar from "./components/NavBar";
import Router from "./Router";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme/palette";

function App() {
  const { getAccessTokenSilently } = useAuth0();
  security.setAccessTokenSilently(getAccessTokenSilently);

  return (
    <div className="App">
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
      <NavBar />
    </div>
  );
}

export default App;
