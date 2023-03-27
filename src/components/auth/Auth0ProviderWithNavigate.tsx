import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Auth0ProviderWithNavigate = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const redirectUri = process.env.REACT_APP_AUTH0_CALLBACK_URL;
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

  const onRedirectCallback = (appState:any) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  if (!(domain && clientId && redirectUri && audience)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        audience: audience,
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
      useRefreshTokens={true}
      useRefreshTokensFallback={true}
    >
      {children}
    </Auth0Provider>
  );
}

export default Auth0ProviderWithNavigate;