import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import styles from "./Home.module.css";
import { Button, Stack, Box, Typography, Container } from "@mui/material";

const Home = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/register",
      },
      authorizationParams: {
        prompt: "login",
      },
    });
  };
  
  const handleSignup = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/register",
      },
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };

  return (
    <main>
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi ipsam
            commodi vero animi tempore amet. Aliquid at dolorem numquam sapiente
            dicta tempora quidem, impedit libero quibusdam. Optio amet tenetur
            non.
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button onClick={() => handleLogin()} variant="contained">
              Log In
            </Button>
            <Button onClick={() => handleSignup()} variant="outlined">
              Sign Up
            </Button>
          </Stack>
        </Container>
      </Box>
    </main>
  );
};

export default Home;
