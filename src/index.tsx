import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter } from "react-router-dom";
import Auth0ProviderWithNavigate from "./components/auth/Auth0ProviderWithNavigate";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <Provider store={store}>
          <App />
        </Provider>
      </Auth0ProviderWithNavigate>
    </BrowserRouter>

  </React.StrictMode>,
  document.getElementById("root")
);
