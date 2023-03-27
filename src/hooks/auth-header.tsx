import { useAuth0 } from "@auth0/auth0-react";
const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

export function useGetAccessToken():any {
  const { getAccessTokenSilently } = useAuth0();
  const getAccessToken = async () =>{
    const accessToken = await getAccessTokenSilently({
      authorizationParams:{
        scope: "openid profile email offline_access",
        audience: audience,
      }
    })
    return accessToken;
  }

  return {
    getAccessToken
  };
}