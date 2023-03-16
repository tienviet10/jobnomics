import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Auth0Provider } from '@auth0/auth0-react';
import { Provider } from "react-redux";
import { store } from "./app/store";

const domain = process.env.REACT_APP_AUTH0_DOMAIN || "";
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID || "";
const redirectUri = process.env.REACT_APP_AUTH0_CALLBACK_URL;
const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        audience: audience,
        redirect_uri: window.location.origin || redirectUri,
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

