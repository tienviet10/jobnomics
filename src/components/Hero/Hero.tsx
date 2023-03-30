import React from "react";

import { Box, Button, styled, Typography } from "@mui/material";
import { Container } from "@mui/system";

import { useAuth0 } from "@auth0/auth0-react";
const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

const Hero = () => {
  const { loginWithRedirect } = useAuth0();

  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(5),
    paddingTop: theme.spacing(3),
    [theme.breakpoints.down("lg")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }));

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "64px",
    color: "#000336",
    fontWeight: "bold",
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px",
    },
  }));

  const handleSignup = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/register",
      },
      authorizationParams: {
        screen_hint: "signup",
        scope: "openid profile email offline_access",
        audience: audience,
      },
    });
  };

  return (
    <Box
      sx={{
        backgroundColor: "#E6F0FF",
        minHeight: "80vh",
        top: 1,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container>
        <CustomBox>
          <Box sx={{ flex: "1" }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: "18px",
                color: "#687690",
                fontWeight: "500",
                mt: 10,
                mb: 4,
              }}
            >
              Welcome to Jobnomics
            </Typography>
            <Title variant="h1">
              The ultimate AI-assisted job application tracker
            </Title>
            <Typography
              variant="body2"
              sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
            >
              AI-powered job application tracker that automates data collection, organization, and provides personalized insights and recommendations to optimize job search efforts.
            </Typography>
            <Button variant="contained" onClick={handleSignup}>
              Get Started
            </Button>
          </Box>

          <Box sx={{ objectFit: "contain", mb: "2rem", maxWidth: "600px" }}>
            <img
              src={"/images/online_resume.svg"}
              alt="heroImg"
              style={{ maxWidth: "100%", height: "100%" }}
            />
          </Box>
        </CustomBox>
      </Container>
    </Box>
  );
};

export default Hero;
