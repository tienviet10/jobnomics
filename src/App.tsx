import React from "react";

import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthenticationGuard } from "./components/auth/AuthWrapper";
import { useAuth0 } from "@auth0/auth0-react";
import { security } from "./components/auth/GlobalAuth";

import Home from "./pages/Home";
import JobPage from "./pages/JobPage";
import SearchPage from "./pages/Search";
import NotePage from "./pages/NotePage";
import NavBar from "./components/NavBar";
import { CssBaseline } from "@mui/material";

function App() {
  const { getAccessTokenSilently } = useAuth0();
  security.setAccessTokenSilently(getAccessTokenSilently);

  return (
    <div className="App">
      <CssBaseline />
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/search"
            element={<AuthenticationGuard component={SearchPage} />}
          />
          <Route
            path="/job"
            element={<AuthenticationGuard component={JobPage} />}
          />
          <Route
            path="/notes"
            element={<AuthenticationGuard component={NotePage} />}
          />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
