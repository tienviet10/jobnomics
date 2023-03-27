import React, { useEffect } from "react";

import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import { security } from "./components/auth/GlobalAuth";
import NavBar from "./components/NavBar";
import Router from "./Router";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import { theme } from "./theme/theme";
import { useGetAllJobsQuery } from "./app/services/job-api";
const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

function App() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const { refetch } = useGetAllJobsQuery({});

  useEffect(() => {
    if (isAuthenticated) {
      security.setAccessTokenSilently(() => getAccessTokenSilently({
        authorizationParams: {
          scope: "openid profile email offline_access",
          audience: audience,
        }
      }));
      refetch();
    }
  }, [isAuthenticated]);

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
