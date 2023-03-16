import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthenticationGuard } from './components/auth/AuthWrapper';
import SearchPage from './pages/Search/SearchPage';
import Home from './pages/Home/Home';
import { useAuth0 } from '@auth0/auth0-react';


import { GetTokenSilentlyOptions } from '@auth0/auth0-react';

let getAccessTokenSilently: (options?: GetTokenSilentlyOptions | undefined) => Promise<string>;

export const sec = {
  getAccessTokenSilently: () => getAccessTokenSilently,
  setAccessTokenSilently: (func: (options?: GetTokenSilentlyOptions | undefined) => Promise<string>) =>
    (getAccessTokenSilently = func),
};

function App() {
  const { getAccessTokenSilently } = useAuth0();
  sec.setAccessTokenSilently(getAccessTokenSilently);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={< Home />} />
          <Route path="/search" element={<AuthenticationGuard component={SearchPage} />} />
          <Route path="*" element={< Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
