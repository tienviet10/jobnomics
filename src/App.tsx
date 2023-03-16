import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthenticationGuard } from './components/auth/AuthWrapper';
import SearchPage from './pages/Search/SearchPage';
import Home from './pages/Home/Home';

function App() {

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
