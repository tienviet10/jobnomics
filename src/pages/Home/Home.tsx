import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import {
  PopupConfigOptions,
  PopupLoginOptions,
  useAuth0,
} from "@auth0/auth0-react";

import styles from "./Home.module.css";
import { Button, Stack, Box, Typography, Container } from "@mui/material";

import PageLoader from "../../components/PageLoader";
import { useSaveUserQuery } from "../../app/services/job-api";

const Home = () => {
  const { loginWithPopup, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const {refetch} = useSaveUserQuery();

  const handleClick = async (
    options?: PopupLoginOptions | undefined,
    config?: PopupConfigOptions | undefined
  ) => {
    await loginWithPopup();
    refetch()
    navigate("/job");
  };

  // const callApi = () => {
  //   fetch("http://localhost:8080")
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .catch(error => {
  //       console.error('There was a problem with the fetch operation:', error);
  //     });
  // };

  // const callProtectedApi = async () => {
  //   const token = await getAccessTokenSilently();
  //   console.log(token);
  //   fetch("http://localhost:8080/protected", {
  //     headers: {
  //       'Authorization': `Bearer ${token}`
  //     }
  //   })
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .catch(error => {
  //       console.error('There was a problem with the fetch operation:', error);
  //     });

  // };

  return (
    // <div>
    //   <ul>
    //     <li>
    //       <button onClick={() => handleClick()}>Login Pop</button>
    //     </li>
    //     <li>
    //       <button onClick={() => logout()}>Logout</button>
    //     </li>
    //   </ul>

    //   <ul>
    //     <li><button onClick={callApi}>Call API</button></li>
    //     <li><button onClick={callProtectedApi}>Call Protected API route</button></li>
    //   </ul>
    //   {isAuthenticated && (
    //     <pre>{JSON.stringify(user, null, 2)}</pre>
    //   )}
    // </div>
    <main>
      {/* Hero unit */}
      {isAuthenticated ? (
        <div className={styles.HomeUserContainer}>
          <PageLoader></PageLoader>
        </div>
      ) : (
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Jobnomics
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
              ipsam commodi vero animi tempore amet. Aliquid at dolorem numquam
              sapiente dicta tempora quidem, impedit libero quibusdam. Optio
              amet tenetur non.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button onClick={() => handleClick()} variant="contained">
                Log In
              </Button>
              <Button onClick={() => handleClick()} variant="outlined">
                Sign Up
              </Button>
            </Stack>
          </Container>
        </Box>
      )}
    </main>
  );
};

export default Home;
