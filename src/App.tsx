import React, { useState, useEffect } from "react";

import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthenticationGuard } from "./components/auth/AuthWrapper";
import { useAuth0 } from "@auth0/auth0-react";
import { security } from "./components/auth/GlobalAuth";

import Home from "./pages/Home/Home";
import JobPage from "./pages/JobPage";
import SearchPage from "./pages/Search";

function App() {
  const { getAccessTokenSilently } = useAuth0();
  security.setAccessTokenSilently(getAccessTokenSilently);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/search"
            element={<AuthenticationGuard component={SearchPage} />}
          />
          <Route
            path="/job"
            element={<JobPage />}
            // element={<AuthenticationGuard component={JobPage} />}
          />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
