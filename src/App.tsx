import React, { useEffect, useState } from "react";

import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import { security } from "./components/auth/GlobalAuth";
import NavBar from "./components/NavBar";
import Router from "./Router";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import { theme } from "./theme/theme";
import { useGetAccessToken } from "./hooks/auth-header";
import { useDispatch } from "react-redux";
import { setAuthToken } from "./features/authSlice";

const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

function App() {
  // const { getAccessTokenSilently } = useAuth0();
  // security.setAccessTokenSilently(getAccessTokenSilently);
  const dispatch = useDispatch();
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  // const {getAccessToken} = useGetAccessToken();

  const getToken = async () =>{
    const accessToken = await getAccessTokenSilently({
      authorizationParams:{
        scope: "openid profile email offline_access",
        audience: audience,
      }
    })
    dispatch(setAuthToken(accessToken))
  }

  useEffect(()=>{
    if(isAuthenticated){
      getToken();
    }
  },[isAuthenticated])

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
