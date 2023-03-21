import React from "react";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import PageLoader from "../PageLoader";
import { AuthenticationGuardProps } from "../../types/auth";

export const AuthenticationGuard: React.FC<AuthenticationGuardProps> = ({
  component,
}) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <PageLoader />,
  });

  return <Component />;
};
