import React from 'react';
import Home from "./pages/Home";
import JobPage from "./pages/JobPage";
import SearchPage from "./pages/Search";
import NotePage from "./pages/NotePage";
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthenticationGuard } from './components/auth/authentication-guard';
import { useAuth0 } from '@auth0/auth0-react';
import PageLoader from './components/PageLoader';

const Router = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <PageLoader />
    );
  }

  return (
    <Routes>
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
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to={isAuthenticated ? "/job" : "/"} />} />
    </Routes>
  );
};

export default Router;