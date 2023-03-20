import React from "react";

import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthenticationGuard } from "./components/auth/AuthWrapper";
import { useAuth0 } from "@auth0/auth0-react";
import { security } from "./components/auth/GlobalAuth";

import { AppBar, Toolbar, Typography } from "@mui/material";
import { Camera } from "@mui/icons-material";

import Home from "./pages/Home/Home";
import JobPage from "./pages/JobPage";
import SearchPage from "./pages/Search";
import { useManageSearchPage } from "./pages/Search/manage-search-page";

function App() {
  const { getAccessTokenSilently } = useAuth0();
  security.setAccessTokenSilently(getAccessTokenSilently);

  const { logout } = useManageSearchPage();

  return (
    <div className="App">
      <AppBar position="relative">
        <Toolbar>
          <Camera sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Search Page
          </Typography>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
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
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
