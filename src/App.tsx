import React from "react";

import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import { security } from "./components/auth/GlobalAuth";
import NavBar from "./components/NavBar";
import Router from "./Router";
import { CssBaseline } from "@mui/material";

function App() {

  const { getAccessTokenSilently } = useAuth0();
  security.setAccessTokenSilently(getAccessTokenSilently);

  return (
    <div className="App">
      <CssBaseline />
      <NavBar />
      <Router/>
    </div>
  );
}

export default App;
